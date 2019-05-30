import React from 'react'
import { connect } from 'react-redux'
import selectors from '../selectors'
import DepartmentDropdown from './DepartmentDropdown'
import constants from '../constants.js'

class EditUserModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { user, closeModal } = this.props

    const textFields = ['name', 'email', 'phone', 'mailStop', 'title']

    return (
      <div
        className="absolute flex flex-row items-center justify-center z-10 top-0 right-0 left-0 bottom-0 p-10"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="w-6/12 bg-white flex flex-col p-10 rounded-lg relative p-3" style={{ height: '50vh' }}>
          <div className="rounded-full bg-orange-600 text-white font-black absolute top-0 right-0 w-12 h-12 flex justify-center items-center m-5 cursor-pointer" onClick={() => closeModal()}>
            x
          </div>
          <h1 className="font-bold text-5xl">Edit User</h1>
          {textFields.map(key => (
            <input
              key={key}
              type="text"
              value={this.state[key] || user[key]}
              onChange={e => this.setState({ [key]: e.target.value })}
              className="border-2 p-3 text-xl rounded-lg mb-5"
            />
          ))}
          <div className={`${constants.button} w-64`}>Save</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user: state.entities.users[props.userRef],
  departments: selectors.assertDepartments(state),
})

export default connect(mapStateToProps)(EditUserModal)