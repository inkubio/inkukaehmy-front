import * as React from 'react';
import { ContentContainer } from '../components/ContentContainer';
import { GrabbingForm } from '../components/GrabbingForm';
import { Title } from '../components/Title';

export const FormPage = ({ props }: any) => (
  <ContentContainer>
    <Title>Uusi kähmy</Title>
    <GrabbingForm />
  </ContentContainer>
);
