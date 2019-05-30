import feathers from '../feathers/index'
import ActionTypes from '../types'

/**
 * Queries service for a list of departments.
 */
const getDepartmentsList = () => dispatch =>
  feathers.client
    .service('departments')
    .find({ query: { $sort: { name: 1 } } }) // Sort alphabetically by name.
    .then(response => dispatch(departmentsReceived(response.data)))

const departmentsReceived = departments => ({
  type: ActionTypes.DepartmentsReceived,
  payload: {
    departments,
  },
})

export default {
  getDepartmentsList,
}
