import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GrabbingPage from './pages/GrabbingPage';
import FormPage from './pages/FormPage';

import './style.css';
import 'react-mde/lib/styles/css/react-mde-all.css';

const App = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route path="/grabbing" component={GrabbingPage} />
    <Route path="/form" component={FormPage} />
  </Switch>
);

export default App;
