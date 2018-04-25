import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { AuthRoute, Login, Signup } from './auth'
import NoMatch from './NoMatch'
import ProductDetails from './ProductDetails'
import AllProductsListing from './AllProductsListing'
import Cart from './Cart'

const Routes = () => (
  <div className="fill-xy center-xy column">
    <Switch>
      <Route exact path="/" component={AllProductsListing} />
      <Route exact path="/home" component={AllProductsListing} />
      <Route path="/product/:id" component={ProductDetails} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/cart" component={Cart} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default Routes
