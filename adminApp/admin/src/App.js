import React from 'react';
import history from './history';
import Login from './components/pages/Login';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import TopBar from './components/topbar/TopBar';
import SideBar from './components/sidebar/SideBar';
import Home from './components/pages/Home.jsx';
import './App.css';
import store from './myStore';
import UserList from './components/userList/UserList';
import User from './components/user/User';

const PrivateRoute = ({ component: Component, ...rest }) => 
(  
  <Route {...rest} render={props => 
  (
    store.getState().auth.isSignedIn ? <Component {...props} /> : <Redirect to={{pathname: '/login'}}/>
  )}/>
);


function App() {

  return (
    <div>
      <Router history={history}>
          <TopBar/>
          <div className="container">
            <SideBar />
            <Switch>
              <PrivateRoute path="/" exact component={Home} />
              <PrivateRoute path="/admins" exact component={UserList} />
              <PrivateRoute path="/admins/:id" exact component={User} />
              <Route path="/login" exact>
                <Login />
              </Route>
            </Switch>
          </div>
      </Router>
    </div>
  )
}

export default App;
