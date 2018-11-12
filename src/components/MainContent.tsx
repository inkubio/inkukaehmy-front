import * as React from 'react';

import { ButtonPillLink } from '../components/ButtonPill';
import { ContentContainer } from '../components/ContentContainer';
import { TextContent } from '../components/TextContent';
import { PageTitle } from '../components/Title';

export const MainContent = (props: {loggedIn: boolean, text: string}) => (
  <ContentContainer>
    <PageTitle>Kähmyt vuodelle 2019</PageTitle>
    <TextContent>
      {props.text}
    </TextContent>
    <div style={{marginTop: '2rem'}}>
      {props.loggedIn ?
        <>
          <ButtonPillLink text="Uusi kähmy!" to="?page=form" primary />
        </>
      :
        <i>Kirjaudu sisään kähmytäksesi!</i>
      }
    </div>
  </ContentContainer>
);
