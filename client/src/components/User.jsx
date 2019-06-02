import React from 'react'
import { useSelector } from 'react-redux'
import { find } from 'lodash'
import ActionCreators from '../actions'
import pencil from '../assets/images/pencil.png'

const User = ({ userRef, onEditClick }) => {
  const user = useSelector(state => ActionCreators.assertUser(state, userRef))
  const currentUser = useSelector(state => state.currentUser)
  const department = useSelector(state => find(state.entities.departments, { _id: user.departmentRef }))

  if (!user) {
    return (
      <li key={user._id} className="flex flex-row bg-white p-4 lg:p-8 md:m-1 shadow lg:w-2/5 mb-3 sm:mb-10 lg:mb-10" />
    )
  }

  return (
    <li key={user._id} className="flex flex-row bg-white p-4 lg:p-8 md:m-1 shadow lg:w-2/5 mb-3 sm:mb-10 lg:mb-10">
      <div
        className="rounded-full w-24 h-24 sm:w-20 sm:h-20 lg:w-32 lg:h-32 mr-5 shadow-xl bg-center bg-cover"
        style={{
          backgroundImage: `url(//pawnee.prmr.ec${user.avatarURL})`,
        }}
      />
      <div className="flex flex-col">
        <div className="font-black text-base md:text-lg lg:text-2xl text-orange-600 flex flex-col">{user.name}</div>
        {department && <div className="text-xs">{department.name}</div>}
        <div className="text-xs">{user.title}</div>
        <div className="text-xs">
          <a className="text-orange-600" href={`mailto:${user.email}`}>
            {user.email}
          </a>
        </div>
        <div className="text-xs md:text-xs">
          <a className="text-orange-600" href={`tel:${user.phone}`}>
            {user.phone}
          </a>
        </div>
        {currentUser && (
          <img
            onClick={() => onEditClick(user._id)}
            src={pencil}
            className="h-5 w-5 mt-2 cursor-pointer"
            title="edit"
          />
        )}
      </div>
    </li>
  )
}

export default User
