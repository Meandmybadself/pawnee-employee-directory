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
          className="text-xs md:text-sm pl-1 md:py-2 shadow-inner shadow border-orange-600 border md:border-r-0 w-1/3 md:w-48 mr-0 mb-2 md:mb-0"
          type="text"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <input
          className="text-xs md:text-sm md:p-2 shadow-inner shadow border-orange-600 border md:border-r-0 w-1/3 md:w-auto"
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
