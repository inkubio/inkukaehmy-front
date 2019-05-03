import * as React from 'react';
import { ContentContainer } from 'src/components/ContentContainer';
import { GrabbingForm } from 'src/components/GrabbingForm';
import { Title } from 'src/components/Title';
import { RouteComponentProps } from 'react-router-dom';

export const FormPage = (props: RouteComponentProps) => (
  <ContentContainer>
    <Title>Uusi kähmy</Title>
    <GrabbingForm {...props} />
  </ContentContainer>
);
