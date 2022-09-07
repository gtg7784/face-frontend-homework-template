import { PropsWithChildren } from 'react';
import styled, { keyframes } from 'styled-components';
import SyncIcon from '@mui/icons-material/Sync';
import * as textStyle from 'styles/text';

interface IProps {
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children, onClick, disabled = false, isLoading = false, ...props
}: PropsWithChildren<IProps>) => (
  <Container
    onClick={onClick}
    disabled={disabled || isLoading}
    data-testid="components/atom/Button"
    {...props}
  >
    {isLoading && (<StyledSyncIcon data-testid="components/atom/Button/SyncIcon" />)}
    {children}
  </Container>
);

const Container = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 288px;
  height: 52px;
  border-radius: 4px;
  border: none;
  ${textStyle.h5}
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.white};

  :disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.bluegrey.light};
    color: ${({ theme }) => theme.colors.bluegrey.sub};
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledSyncIcon = styled(SyncIcon)`
  width: 20px !important;
  height: 20px !important;
  animation: ${rotate} 1s linear infinite;
  margin-right: ${({ theme }) => theme.spacing.small['2']};
  color: ${({ theme }) => theme.colors.primary.main};
`;

export default Button;
