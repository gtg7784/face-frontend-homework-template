import styled from 'styled-components';
import { PropsWithChildren } from 'react';

interface IProps {
  disabled?: boolean;
  value?: string;
  placeholder?: string;
}

const Input = ({
  value,
  placeholder,
  disabled = false,
  children,
  ...props
}: PropsWithChildren<IProps>) => (
  <Container {...props} disabled={disabled}>
    <StyledInput value={value} placeholder={placeholder} disabled={disabled} />
    <RightSection>
      {children}
    </RightSection>
  </Container>
);

const Container = styled.div<{ disabled: boolean }>`
  position: relative;
  width: 288px;
  height: ${({ disabled }) => (disabled ? '38px' : '54px')};
`;

const StyledInput = styled.input`
  width: 100%;
  height: 54px;
  border-radius: 4px;
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.darkgrey.main};
  border: ${({ theme }) => `1px solid ${theme.colors.mediumgrey.main}`};
  padding: 0 ${({ theme }) => theme.spacing.small['3']};

  ::placeholder {
    color: ${({ theme }) => theme.colors.darkgrey.light};
  }

  :focus {
    outline: none;
    border: ${({ theme }) => `1px solid ${theme.colors.darkgrey.main}`};
  }

  :disabled {
    height: 38px;
    border: 0;
    background-color: ${({ theme }) => theme.colors.bluegrey.pale};
    color: ${({ theme }) => theme.colors.bluegrey.sub};
  }

  :disabled:hover {
    background-color: ${({ theme }) => theme.colors.primary.pale};
  }
`;

const RightSection = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  right: ${({ theme }) => theme.spacing.small['3']};
`;

export default Input;
