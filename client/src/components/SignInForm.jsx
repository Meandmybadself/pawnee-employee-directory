import React from 'react'
import feathers from '../feathers'
import constants from '../constants'

class SignInForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'tom.haverford@pawnee.gov',
      password: 'butts',
    }
  }

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          feathers.authenticate(this.state.email, this.state.password)
        }}
      >
        <input
          className="text-xs pl-1 py-1 shadow-inner shadow border-orange-600 border border-r-0"
          type="text"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <input
          className="text-xs p-1 shadow-inner shadow border-orange-600 border border-r-0"
          type="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <input className={constants.button} type="submit" value="Sign In" />
      </form>
    )
  }
}

export default SignInForm
