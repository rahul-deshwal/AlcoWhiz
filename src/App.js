import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Home from './containers/home'
import Cart from './components/cart/cart'

import './App.css';

const App = () => {
  let routes = (
    <Switch>
      <Route path='/cart' component={Cart} />
      <Route path='/' component={Home} />
      <Redirect to='/' />
    </Switch>
  )

  return (
    <div>
      {routes}
    </div>
  )
}

export default App

