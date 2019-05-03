import * as React from 'react';
import { StoreConsumer } from 'src/App';
import { IAppState } from 'src/types';

import { GrabbingFeed } from 'src/components/GrabbingFeed';
import { MainContent } from 'src/components/MainContent';
import { objectToArray } from 'src/functions';

export const MainPage = () => (
  <StoreConsumer>
    {(store: IAppState) => (
      <React.Fragment>
        <MainContent
          title={store.mainPageTitle}
          text={store.mainPageContent}
          loggedIn={store.currentUserID > 0}
        />
        <GrabbingFeed grabs={objectToArray(store.grabbings)} />
      </React.Fragment>
    )}
  </StoreConsumer>
);
