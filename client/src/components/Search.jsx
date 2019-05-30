import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ActionCreators from '../actions'
import { pick, some } from 'lodash'
import selectors from '../selectors'
import User from './User'
import Pagination from './Pagination'
import EditUserModal from './EditUserModal'
import DepartmentDropdown from './DepartmentDropdown'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      skip: 0,
      departmentRef: null,
      editUserRef: null, // '5cef71d2323f1d8470fedbce',
    }
  }

  update(obj) {
    // If we're changing the term, make sure we revert to page 1.
    if (obj.term && obj.term !== this.state.term) {
      obj.skip = 0
    }
    this.setState(obj, () => this.updateSearch())
  }

  updateSearch() {
    const { skip, term, departmentRef } = this.state

    let query = { $skip: skip, $sort: { name: 1 } }

    if (term) {
      // If we have a search term, it needs to use $search to trigger a regex search on the server.
      query = { ...query, name: { $search: term } }
    }

    if (departmentRef && departmentRef !== 'Select Departments') {
      query = { ...query, departmentRef }
    }

    this.props.searchForUsers('searchFeed', query)
  }

  componentDidMount() {
    // Run an initial 'everyone' search.
    this.updateSearch()
  }

  render() {
    const { feed, departments } = this.props

    return (
      <div className="h-screen bg-gray-100">
        {this.state.editUserRef && (
          <EditUserModal userRef={this.state.editUserRef} closeModal={() => this.setState({ editUserRef: null })} />
        )}
        <div className="flex flex-row border bg-gray-300 p-5">
          <h2 className="font-black text-xl mr-5">Search for an employee:</h2>
          <input
            placeholder="Search"
            type="text"
            className="mr-5 pl-2 font-medium"
            autoFocus
            onChange={e => this.update({ term: e.target.value })}
          />
          <DepartmentDropdown onChange={departmentRef => this.update({ departmentRef })} />
        </div>

        {some(feed.result) && (
          <div className="flex flex-col p-5">
            <h2 className="text-5xl font-black">
              {feed.responseDetails.total} Result{feed.responseDetails.total !== 1 && 's'}
            </h2>
            <Pagination responseDetails={feed.responseDetails} onPageClick={skip => this.update({ skip })} />
            <ul className="flex flex-row flex-wrap justify-around">
              {feed.result.map(user => (
                <User user={user} key={user._id} onEditClick={editUserRef => this.setState({ editUserRef })} />
              ))}
            </ul>
            <Pagination responseDetails={feed.responseDetails} onPageClick={skip => this.update({ skip })} />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const getUsersForFeed = selectors.getUsersForFeedFactory()
  return {
    departments: selectors.assertDepartments(state),
    feed: getUsersForFeed(state, 'searchFeed'),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(pick(ActionCreators, ['searchForUsers']), dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)