import React, { useState } from 'react'
import feathers from '../feathers'
import constants from '../constants'

const SignInForm = () => {
  const [email, setEmail] = useState('tom.haverford@pawnee.gov')
  const [password, setPassword] = useState('meat-tornado')

  const textStyles =
    'text-xs md:text-sm shadow-inner shadow border-orange-600 border border-r-0 flex-1 mr-0 md:p-2 pr-0'

  return (
    <form
      className="sm:w-full flex flex-row"
      onSubmit={e => {
        e.preventDefault()
        feathers.authenticate(email, password)
      }}
    >
      <input className={`${textStyles} md:mb-0`} type="text" value={email} onChange={e => setEmail(e.target.value)} />
      <input className={`${textStyles}`} type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <input className={`${constants.button} flex-1 px-4`} type="submit" value="Sign In" />
    </form>
  )
}

export default SignInForm
