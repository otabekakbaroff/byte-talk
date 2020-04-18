import React from 'react';
import {Link,BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Profile from './components/profile';
import Users from './components/users';
// import './socketio/scrypt';
function App() {

  
  return (
    <div className="App"  >
      <h1>ChatApp</h1>
      <Router>
        <div className="Nav">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/users" component={Users}/>
        </Switch>
     </Router>
    </div>
  );
}

export default App;
