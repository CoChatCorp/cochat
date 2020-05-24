import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import LandingPage from './views/LandingPage/LandingPage';
import HomePage from './views/LandingPage/Home';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import ChatPage from './views/ChatPage/ChatPage';
import mainPage from './views/MainContent/mainPage';
import testPage from './views/testPage/testPage';
import Auth from '../hoc/auth'

function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Auth(HomePage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/main" component={Auth(mainPage, true)} />
        <Route exact path="/chat" component={Auth(ChatPage, true)} />
        <Route exact path="/test" component={Auth(testPage, true)} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;