import * as React from 'react';
import { TGrabbing, TAppState } from '../types';
import { StoreConsumer } from '../App';
import { objectToArray } from '../functions';
import { GrabbingFeed } from '../components/GrabbingFeed';
import { MainContent } from '../components/MainContent';

interface IMainPageState {
  grabbings: Array<TGrabbing>;
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
        {(store: TAppState) => (
          <React.Fragment>
            <MainContent />
            <GrabbingFeed grabs={objectToArray(store.grabbings)} />
          </React.Fragment>
        )}
      </StoreConsumer>
    );
  }
}
