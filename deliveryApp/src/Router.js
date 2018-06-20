import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginPage from './components/layout/Login'
import Dashboard from './components/layout/Dashboard'
import Address from './components/layout/Addresses'
const Routers = () => {
  return(
      <Router>
        <Scene key="root">
          <Scene key="login" component={ LoginPage } hideNavBar={true} title="Login" />
          <Scene key="dash" component={ Dashboard } hideNavBar={true} title="Dash" />
          <Scene key="address" component={ Address } hideNavBar={true} title="Dash" initial={true}/>
        </Scene>
      </Router>
    )
}

export default Routers;