import React from 'react'
import { Route, Switch } from 'react-router'

import Header from '../components/Header'
import Nav from '../components/Nav'
import Search from '../components/Search'
import NoMatch from '../components/NoMatch'

const routes = (
  <div className="container mx-auto shadow-xl ">
    <Header />
    <Nav />
    <Switch>
      <Route exact path="/" component={Search} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes
