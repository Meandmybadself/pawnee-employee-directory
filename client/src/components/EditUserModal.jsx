import React from 'react'
import { connect } from 'react-redux'
import selectors from '../selectors'
import constants from '../constants.js'
import { omit, pick } from 'lodash'
import ActionCreators from '../actions'
import { bindActionCreators } from 'redux'

class EditUserModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { _id: props.user._id }
  }
  render() {
    const { user, closeModal, updateUser } = this.props

    const textFields = ['name', 'email', 'phone', 'mailStop', 'title']

    return (
      <div
        className="absolute flex flex-row items-center justify-center z-10 top-0 right-0 left-0 bottom-0 p-10"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div
          className="w-10/12 md:w-6/12 bg-white flex flex-col p-6 md:p-10 rounded-lg relative"
          style={{ height: '75vh' }}
        >
          <div
            className="rounded-full bg-orange-600 font-hairline absolute top-0 right-0 w-6 h-6 md:w-12 md:h-12 flex justify-center items-center m-5 cursor-pointer text-white"
            onClick={() => closeModal()}
          >
            ✖
          </div>
          <h1 className="font-bold md:text-5xl mb-6">Edit User</h1>
          {textFields.map(key => (
            <input
              key={key}
              type="text"
              value={this.state[key] || user[key]}
              onChange={e => this.setState({ [key]: e.target.value })}
              className="border-2 p-3 text-sm md:text-xl rounded-lg mb-5"
            />
          ))}
          <div
            className={`${constants.button} md:w-64`}
            onClick={() => {
              updateUser({ ...omit(user, 'department'), ...this.state }) // Gotta remove the hydrated department.
              closeModal()
            }}
          >
            Save
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user: state.entities.users[props.userRef],
  departments: selectors.assertDepartments(state),
})

const mapDispatchToProps = dispatch => bindActionCreators(pick(ActionCreators, ['updateUser']), dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserModal)
