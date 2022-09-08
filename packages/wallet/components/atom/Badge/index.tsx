import styled from 'styled-components';
import * as textStyle from 'styles/text';

interface IProps {
  text: string;
  isValid: boolean;
}

const Badge = ({ text, isValid }: IProps) => (
  <Container isValid={isValid} data-testid="components/atom/Badge">
    {text}
  </Container>
);

const Container = styled.div<{ isValid: boolean }>`
  ${textStyle.captionMedium}
  padding: 4px 6px;
  border-radius: 4px;
  width: fit-content;
  height: fit-content;
  background: ${({ isValid, theme }) => (
    isValid
      ? theme.colors.primary.pale
      : theme.colors.bluegrey.pale
  )};
  color: ${({ isValid, theme }) => (
    isValid
      ? theme.colors.primary.main
      : theme.colors.mediumgrey.dark
  )};
`;

export default Badge;
