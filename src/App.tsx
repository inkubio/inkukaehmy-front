import * as React from 'react';
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import {
  arrayToObject,
  getCurrentUserId,
  getGrabbingComments,
  getGrabbings,
  getPageTextContent,
} from 'src/functions';

import { IAppState } from 'src/types';

import { FormPage } from 'src/pages/FormPage';
import { GrabbingPage } from 'src/pages/GrabbingPage';
import { MainPage } from 'src/pages/MainPage';

import 'src/style.css';

export const AppContext = React.createContext({});
export const StoreProvider = AppContext.Provider;
export const StoreConsumer = AppContext.Consumer;

// Custom hack to enable routing to different pages via
// only query params. Implementing proper sub-routing
// in WordPress and Apache was harder than this one
const QueryRouter = (props: RouteComponentProps): JSX.Element => {
  const params = new URLSearchParams(props.location && props.location.search);
  const page = params.get('page');
  if (page === 'form') {
    return <FormPage {...props} />;
  }
  if (page === 'grabbings') {
    return <GrabbingPage {...props} />;
  }
  if (page === 'grabbing') {
    return <GrabbingPage id={Number(params.get('id'))} />;
  }
  return <MainPage />;
};

export default class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);

    this.refreshGrabbings = this.refreshGrabbings.bind(this);
    this.state = {
      currentUserID: 0,
      filterBy: 'all',
      grabbings: {},
      mainPageContent: '',
      mainPageTitle: '',
      grabbingBatch: '',
      refreshGrabbings: () => this.refreshGrabbings(),
      sortBy: 'newest',
    };
  }

  async componentDidMount() {
    const wpjson = (await getPageTextContent()) as any;
    this.setState({
      mainPageContent: wpjson[0].content.rendered,
      mainPageTitle: wpjson[0].title.rendered,
      grabbingBatch: wpjson[0].metadata.grabbing_batch[0],
    });

    try {
      const currentUserID = await getCurrentUserId();
      this.setState({ currentUserID });
    } catch (e) {
      console.log(e);
    }

    await this.refreshGrabbings();
  }

  async refreshGrabbings() {
    const grabbings = await getGrabbings();
    const currentGrabbings = grabbings.filter(g => g.batch === this.state.grabbingBatch);
    this.setState({
      grabbings: arrayToObject(currentGrabbings.map(grab => ({ ...grab, comments: [] }))),
    });
    const filledGrabbings = currentGrabbings.map(async grab => ({
      ...grab,
      comments: await getGrabbingComments(grab.ID),
    }));
    Promise.all(filledGrabbings).then(results =>
      this.setState({ grabbings: arrayToObject(results) }),
    );
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
