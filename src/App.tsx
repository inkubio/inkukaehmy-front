import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { arrayToObject, getCurrentUserId, getGrabbings } from './functions';
import { IAppState } from './types';

import { FormPage } from './pages/FormPage';
import { GrabbingPage } from './pages/GrabbingPage';
import { MainPage } from './pages/MainPage';

import './style.css';

const { Provider, Consumer } = React.createContext({});
export const StoreProvider = Provider;
export const StoreConsumer = Consumer;

// Custom hack to enable routing to different pages via
// only query params. Implementing proper sub-routing
// in WordPress and Apache was harder than this one
const QueryRouter = (props: any): any => {
  const params = new URLSearchParams(props.location.search);
  const page = params.get('page');
  if (page === 'form') {
    return <FormPage />;
  } else if (page === 'grabbings') {
    return <GrabbingPage props={props} />
  } else if (page === 'grabbing') {
    return <GrabbingPage id={params.get('id')} />
  }
  return <MainPage />;
};

export default class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentUserID: 0,
      filterBy: 'all',
      grabbings: {},
      sortBy: 'newest',
      update: this.setState,
      visibleGrabbings: [],
    };
  }

  async componentDidMount() {
    const currentUserID = await getCurrentUserId();
    const grabbings = await getGrabbings();
    this.setState({ currentUserID, grabbings: arrayToObject(grabbings) });
  }

  render() {
    return (
      <StoreProvider value={this.state}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={QueryRouter} />
            <Route exact path="/kiltalaisille/hallinto/kahmyt/" component={QueryRouter} />
          </Switch>
        </BrowserRouter>
      </StoreProvider>
    );
  }
}
