import React from 'react'
import feathers from '../feathers'
import constants from '../constants'

class SignInForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'tom.haverford@pawnee.gov',
      password: 'meat-tornado',
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
          className="text-sm pl-1 py-2 shadow-inner shadow border-orange-600 border border-r-0 w-48"
          type="text"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <input
          className="text-sm p-2 shadow-inner shadow border-orange-600 border border-r-0"
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
