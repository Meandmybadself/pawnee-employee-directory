import React, { useEffect } from 'react'
import feathers from '../feathers'
import { useSelector } from 'react-redux'
import CurrentUser from './CurrentUser'
import SignInForm from './SignInForm'

const Nav = () => {
  useEffect(() => {
    if (!user) {
      // Try to auth from stored creds.
      feathers.authenticate()
    }
  })

  const user = useSelector(state => state.currentUser)

  return (
    <div className="border-gray-200 flex flex-row items-center justify-center lg:justify-end p-3 bg-gray-200">
      <div className="flex flex-col justify-end md:flex-row items-center w-full sm:w-1/2">
        {user && <CurrentUser currentUser={user} />}
        {!user && <SignInForm />}
      </div>
    </div>
  )
}

export default Nav
