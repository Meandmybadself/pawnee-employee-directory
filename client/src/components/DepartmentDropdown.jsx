import React from 'react'
import { useSelector } from 'react-redux'
import selectors from '../selectors'

const DepartmentDropdown = ({ onChange }) => {
  const departments = useSelector(state => selectors.assertDepartments(state))
  return (
    <select onChange={e => onChange(e.target.value)}>
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

export default DepartmentDropdown
