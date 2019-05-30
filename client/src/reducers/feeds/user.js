import ActionTypes from '../../types'

export default function employee(state = {}, { type, payload }) {
  switch (type) {
    case ActionTypes.UserAdded:
    case ActionTypes.UserReceived:
      return { ...state } // TODO - Update
    case ActionTypes.UsersReceived:
      const { feedId, result, responseDetails } = payload
      return { ...state, ...{ [feedId]: { result, responseDetails } } }
    default:
      return state
  }
}
