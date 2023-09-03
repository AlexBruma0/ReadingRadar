// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute index component={HomePage} />
        {/* Other public routes */}
      </Switch>
    </Router>
  );
}

export default App;