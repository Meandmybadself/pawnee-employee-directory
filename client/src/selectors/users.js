import { createSelector } from 'reselect'
import { get, keyBy } from 'lodash'

const getDepartments = state => keyBy(get(state, 'entities.departments', {}), '_id')
const getUserFeed = (state, feedId) => get(state, `feeds.user[${feedId}]`, [])
const getUsers = state => get(state, 'entities.users')

const getUsersForFeedFactory = () => {
  return createSelector(
    getUserFeed,
    getUsers,
    getDepartments,
    (feed, users, departments) => {
      if (!feed || !feed.result) {
        return []
      }

      // HMR is x2 embedding.
      if (!get(feed, 'result[0]._id')) {
        feed.result = feed.result.map(userId => {
          const user = users[userId]
          const department = departments[user.departmentRef]
          return {
            ...user,
            department,
          }
        })
      }

      return feed
    }
  )
}

export default {
  getUsersForFeedFactory,
}
