import { combineReducers } from 'redux'
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'

import departments from './entities/departments'
import users from './entities/users'
import currentUser from './entities/currentUser'

import user from './feeds/user'

const rootReducer = history =>
  combineReducers({
    currentUser,
    router: connectRouter(history),
    entities: combineReducers({
      departments,
      users,
    }),
    feeds: combineReducers({
      user,
    }),
  })

export default rootReducer
