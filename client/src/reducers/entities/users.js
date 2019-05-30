import ActionTypes from '../../types'

export default function employees(state = {}, { type, payload }) {
  switch (type) {
    case ActionTypes.UsersReceived:
      const { users } = payload
      return { ...state, ...users }
    default:
      return state
  }
}
