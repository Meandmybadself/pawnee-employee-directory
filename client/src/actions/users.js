import feathers from '../feathers'
import { normalize, schema } from 'normalizr'
import ActionTypes from '../types'
import { omit, get } from 'lodash'
import store from '../store'

const userListSchema = new schema.Entity('users', {}, { idAttribute: '_id' })

/**
 * Performs a server query for users
 * @param feedId
 * @param query
 */

const searchForUsers = (feedId, query) => dispatch =>
  feathers.client
    .service('users')
    .find({ query })
    .then(response => {
      const normalized = normalize(response.data, [userListSchema]) // https://github.com/paularmstrong/normalizr/blob/master/docs/api.md#arraydefinition-schemaattribute
      const responseDetails = omit(response, ['data'])
      const {
        entities: { users },
        result,
      } = normalized
      return dispatch(usersFeedEntities(feedId, result, users, responseDetails))
    })

const updateUser = user => dispatch =>
  feathers.client
    .service('users')
    .update(user._id, user)
    .then(newUser => {
      dispatch(userEntity(user))
    })

const usersFeedEntities = (feedId, result, users, responseDetails) => ({
  type: ActionTypes.UsersReceived,
  payload: {
    feedId,
    result,
    users,
    responseDetails,
  },
})

const userEntity = user => ({
  type: ActionTypes.UserReceived,
  payload: {
    user,
  },
})

const assertUser = (state, userRef) => {
  const user = get(state, `entities.users[${userRef}]`)
  if (user) {
    return user
  }

  feathers.client
    .service('users')
    .get(userRef)
    .then(user => store.dispatch({ type: ActionTypes.UserReceived, payload: { user } }))
}

export default {
  searchForUsers,
  updateUser,
  assertUser,
}
