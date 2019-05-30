import React from 'react'
import feathers from '../feathers'
import constants from '../constants'

const CurrentUser = ({ currentUser }) => {
  if (currentUser && currentUser.name) {
    return (
      <div className="flex flex-row align-middle">
        <div className="mr-3 text-s flex items-center">Welcome back, {currentUser.name}</div>
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
