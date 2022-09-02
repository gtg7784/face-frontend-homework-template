import styled from 'styled-components';
import { forwardRef, PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import * as textStyle from 'styles/text';

interface IProps extends Omit<UseFormRegisterReturn, 'ref'> {
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  onClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, PropsWithChildren<IProps>>(({
  value,
  placeholder,
  disabled = false,
  type = 'text',
  children,
  onClick,
  className,
  ...props
}, ref) => (
  <Container className={className} disabled={disabled} onClick={onClick}>
    <StyledInput
      ref={ref}
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      {...props}
    />
    <RightSection>
      {children}
    </RightSection>
  </Container>
));

const Container = styled.div<{ disabled: boolean }>`
  position: relative;
  width: 288px;
  height: ${({ disabled }) => (disabled ? '38px' : '54px')};
`;

const StyledInput = styled.input`
  width: 100%;
  height: 54px;
  border-radius: 4px;
  ${textStyle.body1Regular}
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
    ${textStyle.body2Medium}
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
