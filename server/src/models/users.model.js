// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient')
  const users = new mongooseClient.Schema(
    {
      name: { type: String, unique: true, required: true },
      email: { type: String, unique: true, lowercase: true },
      phone: { type: String, index: true },
      mailStop: { type: String, required: true },
      title: { type: String, required: true },
      isActive: { type: Boolean, required: true },
      isAdmin: { type: Boolean, required: true },
      password: { type: String },
      avatarURL: { type: String, required: true },
      departmentRef: { type: mongooseClient.ObjectId, required: true, ref: 'departments' },
    },
    {
      timestamps: true,
    }
  )

  return mongooseClient.model('users', users)
}
