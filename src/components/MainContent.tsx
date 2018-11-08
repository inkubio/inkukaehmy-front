import * as React from 'react';

import { ButtonPillLink } from '../components/ButtonPill';
import { ContentContainer } from '../components/ContentContainer';
import { TextContent } from '../components/TextContent';
import { PageTitle } from '../components/Title';

export const MainContent: React.SFC<{loggedIn: boolean}> = (loggedIn) => (
  <ContentContainer>
    <PageTitle>Kähmyä pls</PageTitle>
    <TextContent>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </TextContent>
    <div style={{marginTop: '2rem'}}>
      {!loggedIn ?
        <>
          <ButtonPillLink text="Uusi kähmy!" to="?page=form" primary />
          <ButtonPillLink text="Selaa kähmyjä" to="?page=grabbings" />
        </>
      :
        <i>Kirjaudu sisään kähmytäksesi!</i>
      }
    </div>
  </ContentContainer>
);
