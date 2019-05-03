import * as React from 'react';

import { ButtonPillLink } from 'src/components/ButtonPill';
import { ContentContainer } from 'src/components/ContentContainer';
import { TextContent } from 'src/components/TextContent';
import { Link } from 'react-router-dom';
import { PageTitle } from 'src/components/Title';

interface IMainContentProps {
  loggedIn: boolean;
  title: string;
  text: string;
}

export const MainContent: React.SFC<IMainContentProps> = ({ loggedIn, title, text }) => (
  <ContentContainer>
    <PageTitle>{title}</PageTitle>
    <Link to="?page=old" onClick={() => window.scrollTo(0, 0)} style={{ float: 'right' }}>
      Selaa vanhoja kähmyjä »
    </Link>
    <TextContent>{text}</TextContent>
    <div style={{ marginTop: '2rem' }}>
      {loggedIn ? (
        <>
          <ButtonPillLink text="Uusi kähmy!" to="?page=form" primary />
        </>
      ) : (
        <i>Kirjaudu sisään kähmytäksesi!</i>
      )}
    </div>
  </ContentContainer>
);
