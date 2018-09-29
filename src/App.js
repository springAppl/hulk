import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Login from './components/login';
import Boot from './components/boot';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/boot" component={Boot} />
        </div>
      </Router>
    );
  }
}
export default App;
