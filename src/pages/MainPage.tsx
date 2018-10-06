import * as React from 'react';
import { StoreConsumer } from '../App';
import { IAppState, IGrabbing } from '../types';

import { GrabbingFeed } from '../components/GrabbingFeed';
import { MainContent } from '../components/MainContent';
import { objectToArray } from '../functions';

interface IMainPageState {
  grabbings: IGrabbing[];
}

interface IMainPageProps {
  props: any;
}

export class MainPage extends React.Component<IMainPageProps, IMainPageState> {
  constructor(props: IMainPageProps) {
    super(props);
    this.state = {
      grabbings: [],
    };
  }

  render() {
    return (
      <StoreConsumer>
        {(store: IAppState) => (
          <React.Fragment>
            <MainContent />
            <GrabbingFeed grabs={objectToArray(store.grabbings)} />
          </React.Fragment>
        )}
      </StoreConsumer>
    );
  }
}
