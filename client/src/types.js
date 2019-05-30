const userActionTypes = {
  UsersReceived: 'USERS_RECEIVED',
  UserReceived: 'USER_RECEIVED',
}
const departmentActionTypes = {
  DepartmentsReceived: 'DEPARTMENTS_RECEIVED',
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
