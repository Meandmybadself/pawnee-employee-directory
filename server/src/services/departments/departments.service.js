// Initializes the `departments` service on path `/departments`
const createService = require('feathers-mongoose')
const createModel = require('../../models/departments.model')
const hooks = require('./departments.hooks')

module.exports = function(app) {
  const Model = createModel(app)

  const options = {
    Model,
    paginate: {
      default: 50,
      max: 50,
    },
  }

  // Initialize our service with any options it requires
  app.use('/departments', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('departments')

  service.hooks(hooks)
}
