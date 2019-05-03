import * as React from 'react';
import { ContentContainer } from 'src/components/ContentContainer';
import { GrabbingForm } from 'src/components/GrabbingForm';
import { Title } from 'src/components/Title';

export const FormPage = () => (
  <ContentContainer>
    <Title>Uusi kähmy</Title>
    <GrabbingForm />
  </ContentContainer>
);
