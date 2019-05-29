const { authenticate } = require('@feathersjs/authentication').hooks

const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks

const searchRegex = () => hook => {
  const query = hook.params.query
  for (let field in query) {
    if (query[field].$search && field.indexOf('$') == -1) {
      query[field] = { $regex: new RegExp(query[field].$search, 'i') }
    }
  }
  hook.params.query = query
  return hook
}

module.exports = {
  before: {
    all: [],
    find: [searchRegex()],
    get: [],
    create: [authenticate('jwt'), hashPassword()],
    update: [authenticate('jwt'), hashPassword()],
    patch: [authenticate('jwt'), hashPassword()],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
