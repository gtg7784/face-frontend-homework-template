import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import * as textStyle from 'styles/text';

interface IProps {
  message: string;
}

const Tooltip = ({ message, children, ...props }: PropsWithChildren<IProps>) => (
  <Container {...props} data-testid="components/atom/Tooltip">
    {children}
    <Message data-testid="components/atom/Tooltip/Message">{message}</Message>
  </Container>
);

const Container = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  cursor: pointer;

  &:hover {
    & > div {
      display: block;
    }
  }
`;

const Message = styled.div`
  position: absolute;
  display: none;
  top: 0;
  left: 50%;
  transform: ${({ theme }) => `translate(-50%, calc(-100% - ${theme.spacing.small['1']}))`};
  text-overflow: ellipsis;
  border-radius: 4px;
  white-space: pre;
  z-index: 9999;
  ${textStyle.captionMedium}
  padding: ${({ theme }) => `6px ${theme.spacing.small['2']}`};
  background: ${({ theme }) => theme.colors.darkgrey.main};
  color: ${({ theme }) => theme.colors.white};
`;

export default Tooltip;
export type { IProps };
