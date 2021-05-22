import React from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import Register from './components/auth/register';
import Login from './components/auth/login';
import NotFound from './components/pages/NotFound';


import UserState from './context/user/UserState';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';

import './App.css';

import About from './components/pages/About';
import setAuthToken from './utils/setAuthToken';
import PrivateRoutes from './components/routing/PrivateRoutes';
import User from './components/users/User';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}
const App = () => {
  return (
    <AuthState>
      <UserState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar />
              <div className="container">
                <Alert alert={alert} />
                <Switch>
                  <PrivateRoutes exact path='/' component={Home} />
                  <PrivateRoutes exact path="/user/:id" component={User} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path="/about" component={About} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </Router>
        </AlertState>
      </UserState>
    </AuthState>
  );
}

export default App;
