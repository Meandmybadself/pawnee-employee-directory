import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ActionCreators from '../actions'
import { pick, some } from 'lodash'
import selectors from '../selectors'
import User from './User'
import Pagination from './Pagination'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      skip: 0,
      departmentRef: undefined,
    }
  }

  update(obj) {
    this.setState(obj, () => this.updateSearch())
  }

  updateSearch() {
    const { skip, term, departmentRef } = this.state

    let query = { $skip: skip, $sort: { name: 1 }, departmentRef }

    if (term) {
      // If we have a search term, it needs to use $search to trigger a regex search on the server.
      query = { ...query, name: { $search: term } }
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
        <div className="flex flex-row border bg-gray-300 p-5">
          <h2 className="font-black text-xl mr-5">Search for an employee:</h2>
          <input
            placeholder="Search"
            type="text"
            className="mr-5 pl-2 font-medium"
            autoFocus
            onChange={e => this.update({ term: e.target.value })}
          />
          <select onChange={e => this.update({ departmentRef: e.target.value })}>
            <option>Select Departments</option>
            {departments &&
              Object.keys(departments).map(id => (
                <option key={id} value={departments[id]._id}>
                  {departments[id].name}
                </option>
              ))}
          </select>
        </div>

        {some(feed.result) && (
          <div className="flex flex-col p-5">
            <h2 className="text-5xl font-black">
              {feed.responseDetails.total} Result{feed.responseDetails.total !== 1 && 's'}
            </h2>
            <Pagination responseDetails={feed.responseDetails} onPageClick={skip => this.update({ skip })} />
            <ul className="flex flex-row flex-wrap justify-around">
              {feed.result.map(user => (
                <User user={user} key={user._id} />
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
