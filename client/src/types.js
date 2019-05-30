const userActionTypes = {
  UsersReceived: 'USERS_RECEIVED',
  UserReceived: 'USER_RECEIVED',
  UserAdded: 'USER_ADDED',
}
const departmentActionTypes = {
  DepartmentsReceived: 'DEPARTMENTS_RECEIVED',
  DepartmentReceived: 'DEPARTMENT_RECEIVED',
  DepartmentAdded: 'DEPARTMENT_ADDED',
}

const authActionTypes = {
  UserLoggedIn: 'USER_LOGGED_IN',
  UserLoggedOut: 'USER_LOGGED_OUT',
}

export default {
  ...userActionTypes,
  ...departmentActionTypes,
  ...authActionTypes,
}
