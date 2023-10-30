import { Container } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';

type PropsPage = {
  title: string;
  children?: ReactNode;
};

export default function Page(props: PropsPage) {
  return (
    <>
      <Helmet>
        <title> {props.title}</title>
      </Helmet>

      <Container>{props.children}</Container>
    </>
  );
}
