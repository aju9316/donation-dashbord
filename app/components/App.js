import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
			<HashRouter>
        <Route exact path="/" component={Dashboard} />
      </HashRouter >
    )
  }
}
export default App;