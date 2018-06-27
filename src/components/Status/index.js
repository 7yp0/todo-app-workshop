// @flow
import React, { type Node } from 'react';
import styled, { keyframes } from 'styled-components';

import ErrorMessage from '../ErrorMessage';

type Props = {
  error?: Error,
};

const fade = keyframes`
  from {
    opacity: 0.4;
  }

  to {
    opacity: 1;
  }
`;

const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  margin: 0.5rem;
  background-color: #e0e0e0;
  animation-name: ${fade};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;

const Status = (props: Props): Node => {
  const { error } = props;

  if (error) {
    return <ErrorMessage />;
  }

  return <StyledLoader />;
};

export default Status;
