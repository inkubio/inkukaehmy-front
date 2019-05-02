import * as React from 'react';
import { StoreConsumer } from '../App';
import { IAppState } from '../types';

import { GrabbingFeed } from '../components/GrabbingFeed';
import { MainContent } from '../components/MainContent';
import { objectToArray } from '../functions';

export const MainPage = () => (
  <StoreConsumer>
    {(store: IAppState) => (
      <React.Fragment>
        <MainContent text={store.mainPageContent} loggedIn={store.currentUserID > 0} />
        <GrabbingFeed grabs={objectToArray(store.grabbings)} />
      </React.Fragment>
    )}
  </StoreConsumer>
);
