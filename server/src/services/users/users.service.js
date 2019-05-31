// Initializes the `users` service on path `/users`
const createService = require('feathers-mongoose')
const createModel = require('../../models/users.model')
const hooks = require('./users.hooks')

module.exports = function(app) {
  const Model = createModel(app)

  const options = {
    Model,
    paginate: {
      default: 8,
      max: 50,
    },
  }

  // Initialize our service with any options it requires
  app.use('/users', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('users')

  service.hooks(hooks)
}
