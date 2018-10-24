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

const QueryRouter = (props: any): any => {
  const params = new URLSearchParams(props.location.search);
  const page = params.get('page');
  console.log(page); //tslint:disable-line
  if (page === 'form') {
    return <FormPage />;
  } else if (page === 'grabbings') {
    return <GrabbingPage props={props} />
  } else if (page === 'grabbing') {
    return <GrabbingPage id={params.get('id')} />
  }
  return <MainPage props={{}}/>;
};

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
            <Route exact path="/kiltalaisille/hallinto/kahmyt/" component={QueryRouter} />
          </Switch>
        </BrowserRouter>
      </StoreProvider>
    );
  }
}
