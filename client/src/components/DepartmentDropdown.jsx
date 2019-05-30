import React from 'react'
import { connect } from 'react-redux'
import selectors from '../selectors'

class DeparmentDropdown extends React.Component {
  render() {
    const { departments } = this.props
    return (
      <select onChange={e => this.props.onChange(e.target.value)}>
        <option className="border-2 p-2">Select Department</option>
        {departments &&
          Object.keys(departments).map(id => (
            <option key={id} value={departments[id]._id}>
              {departments[id].name}
            </option>
          ))}
      </select>
    )
  }
}

const mapStateToProps = state => ({
  departments: selectors.assertDepartments(state),
})

export default connect(mapStateToProps)(DeparmentDropdown)
