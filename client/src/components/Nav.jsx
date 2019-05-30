import React from 'react'
import feathers from '../feathers'
import { connect } from 'react-redux'
import CurrentUser from './CurrentUser'
import SignInForm from './SignInForm'
import constants from '../constants'

class Nav extends React.Component {
  componentDidMount() {
    // Try to auth from stored creds.
    feathers.authenticate()
  }

  render() {
    return (
      <div
        className="border-gray-200 flex flex-row items-center justify-end p-3"
        style={{ backgroundColor: constants.headerBG }}
      >
        <div className="flex flex-col md:flex-row items-center">
          {this.props.currentUser && <CurrentUser currentUser={this.props.currentUser} />}
          {!this.props.currentUser && <SignInForm />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
})

export default connect(mapStateToProps)(Nav)
