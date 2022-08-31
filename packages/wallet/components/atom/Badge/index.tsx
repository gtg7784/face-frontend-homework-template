import styled from 'styled-components';

interface IProps {
  text: string;
  isComplete: boolean;
}

const Badge = ({ text, isComplete }: IProps) => (
  <Container isComplete={isComplete}>
    {text}
  </Container>
);

const Container = styled.div<{ isComplete: boolean }>`
  padding: 4px 6px;
  border-radius: 4px;
  width: fit-content;
  height: fit-content;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  background: ${({ isComplete, theme }) => (
    isComplete
      ? theme.colors.primary.pale
      : theme.colors.bluegrey.pale
  )};
  color: ${({ isComplete, theme }) => (
    isComplete
      ? theme.colors.primary.main
      : theme.colors.bluegrey.dark
  )};
`;

export default Badge;
