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
        className="sm:w-full flex flex-row"
        onSubmit={e => {
          e.preventDefault()
          feathers.authenticate(this.state.email, this.state.password)
        }}
      >
        <input
          className="text-xs md:text-sm pl-1 p-2 pr-0 shadow-inner shadow border-orange-600 border border-r-0 md:w-48 mr-0 md:mb-0 flex-1"
          type="text"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <input
          className="text-xs md:text-sm px-4 md:p-2 shadow-inner shadow border-orange-600 border border-r-0 flex-1"
          type="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <input className={`${constants.button} flex-1`} type="submit" value="Sign In" />
      </form>
    )
  }
}

export default SignInForm
