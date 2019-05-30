import React from 'react'
import { connect } from 'react-redux'
import pencil from '../assets/images/pencil.png'
import { get, keyBy } from 'lodash'
import ActionCreators from '../actions'

class User extends React.Component {
  render() {
    const { userRef, user, currentUser, onEditClick, departments } = this.props

    if (!this.props.user) {
      return <li key={userRef} />
    }

    const department = get(departments, user.departmentRef)

    return (
      <li key={user._id} className="flex flex-row bg-white p-5 md:m-1">
        <div
          className="rounded-full w-20 h-20 md:w-40 md:h-40 mr-5 shadow-lg"
          style={{
            backgroundImage: `url(http://localhost:3030${user.avatarURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="flex flex-col">
          <div className="font-black text-base md:text-2xl text-orange-600 flex flex-col">{user.name}</div>
          {department && <div className="text-xs md:text-xl">{department.name}</div>}
          <div className="text-xs md:text-xl">{user.title}</div>
          <div className="text-xs md:text-base">
            <a className="text-orange-600" href={`mailto:${user.email}`}>
              {user.email}
            </a>
          </div>
          <div className="text-xs md:text-base">
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

const mapStateToProps = (state, props) => ({
  currentUser: state.currentUser,
  user: ActionCreators.assertUser(state, props.userRef),
  departments: keyBy(state.entities.departments, '_id'),
})

export default connect(mapStateToProps)(User)
