import ActionTypes from '../../types'

export default function employees(state = {}, { type, payload }) {
  switch (type) {
    case ActionTypes.UsersReceived:
      const { users } = payload
      return { ...state, ...users }
    case ActionTypes.UserReceived:
        const {user} = payload
      return { ...state, [user._id]:user}
    default:
      return state
  }
}
