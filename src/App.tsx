import * as React from 'react';
import { TAppState } from './types';
import { getGrabbings, arrayToObject } from './functions';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { GrabbingPage } from './pages/GrabbingPage';
import { FormPage } from './pages/FormPage';

import './style.css';
import 'react-mde/lib/styles/css/react-mde-all.css';

const { Provider, Consumer } = React.createContext({});
export const StoreProvider = Provider;
export const StoreConsumer = Consumer;

export default class App extends React.Component<{}, TAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      grabbings: {},
      update: this.setState,
    };
  }

  async componentDidMount() {
    const grabbings = await getGrabbings();
    this.setState({ grabbings: arrayToObject(grabbings) });
  }

  render() {
    return (
      <StoreProvider value={this.state}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/grabbing/:id" component={GrabbingPage} />
            <Route path="/form" component={FormPage} />
          </Switch>
        </BrowserRouter>
      </StoreProvider>
    );
  }
}
