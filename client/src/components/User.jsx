import React from 'react'
import { connect } from 'react-redux'
import pencil from '../assets/images/pencil.png'
import { has } from 'lodash'

class User extends React.Component {
  render() {
    const { user, currentUser, onEditClick } = this.props

    console.log(user.name, user.department)

    return (
      <li key={user._id} className="flex flex-row bg-white p-5 m-1">
        <div
          className="rounded-full w-40 h-40 mr-5 shadow-lg"
          style={{
            backgroundImage: `url(http://localhost:3030${user.avatarURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="flex flex-col">
          <div className="font-black text-2xl text-orange-600 flex flex-col">{user.name}</div>
          {has(user, 'department') && <div className="text-xl">{user.department.name}</div>}
          <div className="text-xl">{user.title}</div>
          <div className="text-base">
            <a className="text-orange-600" href={`mailto:${user.email}`}>
              {user.email}
            </a>
          </div>
          <div className="text-base">
            <a className="text-orange-600" href={`tel:${user.phone}`}>
              {user.phone}
            </a>
          </div>
          {currentUser && (
            <img
              onClick={() => onEditClick(user._id)}
              src={pencil}
              className="h-6 w-6 mt-3 cursor-pointer"
              title="edit"
            />
          )}
        </div>
      </li>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
})

export default connect(mapStateToProps)(User)
