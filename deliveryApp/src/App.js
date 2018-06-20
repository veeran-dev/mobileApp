import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router from './Router'
import store from './Store'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
          <Router />
      </Provider>
    );
  }
}