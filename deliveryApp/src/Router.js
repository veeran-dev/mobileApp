import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginPage from './components/layout/Login'
import Dashboard from './components/layout/Dashboard'
import Address from './components/view/Addresses'
import WaterDeliveryDetails from './components/view/WaterDeliveryDetails'
import WaterDeliveryDR from './components/view/WaterDeliveryDR'
const Routers = () => {
  return(
      <Router>
        <Scene key="root">
          <Scene key="login" component={ LoginPage } hideNavBar={true} title="Login" initial={true} />
          <Scene key="dash" component={ Dashboard } hideNavBar={true} title="Dash" />
          <Scene key="address" component={ Address } hideNavBar={true} title="Dash" />
          <Scene key="waterDetails" component={ WaterDeliveryDetails } hideNavBar={true} title="Dash" />
          <Scene key="WaterDocs" component={ WaterDeliveryDR } hideNavBar={true} title="Dash" />
        </Scene>
      </Router>
    )
}

export default Routers;