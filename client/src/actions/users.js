import feathers from '../feathers/index'
import { normalize, schema } from 'normalizr'
import ActionTypes from '../types'
import { omit } from 'lodash'

const userListSchema = new schema.Entity('users', {}, { idAttribute: '_id' })

/**
 * Performs a server query for users
 * @param feedId
 * @param query
 */

const searchForUsers = (feedId, query) => dispatch => {
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
      dispatch(usersFeedEntities(feedId, result, users, responseDetails))
    })
}

const usersFeedEntities = (feedId, result, users, responseDetails) => ({
  type: ActionTypes.UsersReceived,
  payload: {
    feedId,
    result,
    users,
    responseDetails,
  },
})

export default {
  searchForUsers,
}
