import React from 'react'
import feathers from '../feathers'
import constants from '../constants'

const CurrentUser = ({ currentUser }) => {
  if (currentUser && currentUser.name) {
    return (
      <div className="md:flex flex-row align-middle">
        <div className="mr-3 text-xs md:text-sm flex items-center">
          <div
            className="rounded-full w-6 h-6 mr-2 bg-center bg-cover shadow-xl hidden sm:block"
            style={{
              backgroundImage: `url(//pawnee.prmr.ec${currentUser.avatarURL})`,
            }}
          />
          <span>{currentUser.name}</span>
        </div>
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
