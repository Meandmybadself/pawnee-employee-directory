import ActionTypes from '../../types'

export default function departments(state = {}, { type, payload }) {
  switch (type) {
    case ActionTypes.DepartmentsReceived:
      return { ...state, ...payload.departments }
    default:
      return state
  }
}
