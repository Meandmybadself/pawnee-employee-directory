import ActionTypes from '../../types'

export default function currentUser(state = null, { type, payload }) {
  switch (type) {
    case ActionTypes.UserLoggedIn:
      return payload.user
    case ActionTypes.UserLoggedOut:
      return null
    default:
      return state
  }
}
