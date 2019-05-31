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
      <li key={user._id} className="flex flex-row bg-white p-4 lg:p-8 md:m-1 shadow lg:w-2/5 mb-3 sm:mb-10 lg:mb-10">
        <div
          className="rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 mr-3 shadow"
          style={{
            backgroundImage: `url(//pawnee.prmr.ec${user.avatarURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="flex flex-col">
          <div className="font-black text-base md:text-xl lg:text-2xl text-orange-600 flex flex-col">{user.name}</div>
          {department && <div className="text-xs">{department.name}</div>}
          <div className="text-xs md:text-xs">{user.title}</div>
          <div className="text-xs md:text-xs">
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
}

const mapStateToProps = (state, props) => ({
  currentUser: state.currentUser,
  user: ActionCreators.assertUser(state, props.userRef),
  departments: keyBy(state.entities.departments, '_id'),
})

export default connect(mapStateToProps)(User)
