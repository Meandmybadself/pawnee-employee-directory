import { get, some } from 'lodash'
import store from '../store'
import ActionCreators from '../actions'

const assertDepartments = state => {
  const departmentsFromStore = get(state, 'entities.departments')
  if (some(departmentsFromStore)) {
    return departmentsFromStore
  }
  store.dispatch(ActionCreators.getDepartmentsList())
}

export default {
  assertDepartments,
}
