import React from 'react'
import { connect } from 'react-redux'
import pencil from '../assets/images/pencil.png'

class User extends React.Component {
  render() {
    const { user, currentUser } = this.props

    return (
      <li key={user._id} className="flex flex-row bg-white p-5 m-1">
        <div
          className="rounded-full w-40 h-40 mr-5"
          style={{
            backgroundImage: `url(https://via.placeholder.com/100)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="flex flex-col">
          <div className="font-black text-2xl text-orange-600 flex flex-col">{user.name}</div>
          <div className="user__department text-xl">{user.department.name}</div>
          <div className="user__title text-xl">{user.title}</div>
          <div className="user__mailStop text-xl">{user.mailStop}</div>
          <div className="user__phone text-xl">{user.phone}</div>
          {currentUser && <img src={pencil} className="h-6 w-6 mt-3" />}
        </div>
      </li>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
})

export default connect(mapStateToProps)(User)
