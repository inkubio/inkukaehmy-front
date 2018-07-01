import * as React from 'react';
import { ContentContainer } from '../components/ContentContainer';
import { ButtonPillLink } from '../components/ButtonPill';
import { Title } from '../components/Title';

export const MainPage = ({ props }: any) => (
  <ContentContainer>
    <Title>Kähmyä pls</Title>
    <ButtonPillLink text="New grab" to="/form" />
    <ButtonPillLink text="View grabbings" to="/grabbing" />
  </ContentContainer>
);
