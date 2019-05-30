import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import axios from 'axios'
import auth from '@feathersjs/authentication-client'
import store from '../store'
import ActionTypes from '../types'

// Setup feathers as a rest client.
const restClient = rest('http://localhost:3030')

const client = feathers()
  .configure(restClient.axios(axios))
  .configure(auth({ storage: window.localStorage }))

client.on('reauthentication-error', () => logout())

const authenticate = async (email = null, password = null) => {
  const authObj = email && password ? { email, password, strategy: 'local' } : {}

  client
    .authenticate(authObj)
    .then(response => client.passport.verifyJWT(response.accessToken))
    .then(payload => client.service('users').get(payload.userId))
    .then(user => {
      store.dispatch({ type: ActionTypes.UserLoggedIn, payload: { user } })
    })
    .catch(e => {
      console.log('auth error', e)
    })
}

const logout = () => {
  client.logout()
  store.dispatch({ type: ActionTypes.UserLoggedOut, payload: {} })
}
export default { client, authenticate, logout }
