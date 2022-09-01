import styled from 'styled-components';

interface IProps {
  text: string;
  isValid: boolean;
}

const Badge = ({ text, isValid }: IProps) => (
  <Container isValid={isValid}>
    {text}
  </Container>
);

const Container = styled.div<{ isValid: boolean }>`
  padding: 4px 6px;
  border-radius: 4px;
  width: fit-content;
  height: fit-content;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  background: ${({ isValid, theme }) => (
    isValid
      ? theme.colors.primary.pale
      : theme.colors.bluegrey.pale
  )};
  color: ${({ isValid, theme }) => (
    isValid
      ? theme.colors.primary.main
      : theme.colors.bluegrey.dark
  )};
`;

export default Badge;
