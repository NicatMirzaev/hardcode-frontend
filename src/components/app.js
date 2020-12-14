import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../redux/containers/home';
import Dashboard from '../redux/containers/dashboard';
import '../css/tailwind.output.css';
import ConfirmUser from './pages/confirm-user.js';
import ResetPassword from './pages/reset-password.js';
import MyProfile from '../redux/containers/my-profile';
import settings from '../lib/settings';
import { getValue } from '../lib/store.js';
import { USER_DETAILS } from '../lib/queries';

const App = props => {

  React.useEffect(() => {
    const value = getValue('token');
    if(value) {
      fetch(settings.apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + value
        },
        body: JSON.stringify({
          query: USER_DETAILS
        })
    }).then(r => r.json())
      .then(data => {
        if(data.data) {
          const userData = data.data.me;
          console.log(userData);
          if(userData)
          {
            if(userData.isConfirmed === true){
              console.log(userData);
              props.setUser({isLogged: true, isLoading: false, data: {token: value, user: userData}})
            }
          }
          else props.setUser({isLogged: false, isLoading: false})
        }
        else {
          props.setUser({isLogged: false, isLoading: false})
        }
      });
    }
    else props.setUser({isLogged: false, isLoading: false})
  }, [])

  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route path="/confirm/:token" component={ConfirmUser}/>
      <Route path="/reset-password/:token" component={ResetPassword}/>
      <Route path="/my-profile" component={MyProfile}/>
    </Switch>
  )
};

export default App;
