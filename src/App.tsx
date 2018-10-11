import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { arrayToObject, getGrabbings } from './functions';
import { IAppState } from './types';

import { FormPage } from './pages/FormPage';
import { GrabbingPage } from './pages/GrabbingPage';
import { MainPage } from './pages/MainPage';

import './style.css';

const { Provider, Consumer } = React.createContext({});
export const StoreProvider = Provider;
export const StoreConsumer = Consumer;

export default class App extends React.Component<{}, IAppState> {
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
