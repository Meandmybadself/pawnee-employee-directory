import React from 'react'
import { Route, Switch } from 'react-router'

import Header from '../components/Header'
import Nav from '../components/Nav'
import Search from '../components/Search'
import NoMatch from '../components/NoMatch'
import Edit from '../components/Edit'

const routes = (
  <div className="container mx-auto">
    <Header />
    <Nav />
    <Switch>
      <Route exact path="/" component={Search} />
      <Route path="/edit/:id" component={Edit} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes
