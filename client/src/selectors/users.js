import { createSelector } from 'reselect'
import { get, keyBy } from 'lodash'
import store from '../store.jsx'
import feathers from '../feathers'
import types from '../types'

const getDepartments = state => keyBy(get(state, 'entities.departments', {}), '_id')
const getUserFeed = (state, feedId) => get(state, `feeds.user[${feedId}]`, [])
const getUsers = state => get(state, 'entities.users')
const getUser = (state, userRef) => get(state, 'entities.users[${userRef}]')

export default {
  getUser,
}
