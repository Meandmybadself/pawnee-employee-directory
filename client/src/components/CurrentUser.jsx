import React from 'react'
import feathers from '../feathers'
import constants from '../constants'

const CurrentUser = ({ currentUser }) => {
  if (currentUser && currentUser.name) {
    return (
      <div className="hidden md:flex flex-row align-middle">
        <div className="mr-3 text-xs md:text-sm flex items-center">Welcome back, {currentUser.name}</div>
        <div className={constants.button} onClick={() => feathers.logout()}>
          Sign Out
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

export default CurrentUser
