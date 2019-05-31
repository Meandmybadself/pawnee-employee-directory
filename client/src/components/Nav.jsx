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
      <div className="border-gray-200 flex flex-row items-center justify-center lg:justify-end p-3 bg-gray-200">
        <div className="flex flex-col justify-end md:flex-row items-center w-full sm:w-1/3">
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
