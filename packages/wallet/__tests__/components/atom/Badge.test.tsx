import { faker } from '@faker-js/faker';
import Badge from 'components/atom/Badge';
import theme from 'styles/theme';
import { renderWithTheme } from 'testing-library';

describe('components/atom/Badge', () => {
  it('should render', () => {
    const text = faker.lorem.word();
    const isValid = faker.datatype.boolean();
    const { queryByTestId } = renderWithTheme(<Badge text={text} isValid={isValid} />, {});

    expect(queryByTestId('components/atom/Badge')).toBeInTheDocument();
    expect(queryByTestId('components/atom/Badge')).toHaveTextContent(text);
  });

  it('should render with valid style', () => {
    const text = faker.lorem.word();
    const isValid = true;
    const { queryByTestId } = renderWithTheme(<Badge text={text} isValid={isValid} />, {});

    expect(queryByTestId('components/atom/Badge')).toHaveStyle(`
      background: ${theme.colors.primary.pale};
      color: ${theme.colors.primary.main};
    `);
  });

  it('should render with invalid style', () => {
    const text = faker.lorem.word();
    const isValid = false;
    const { queryByTestId } = renderWithTheme(<Badge text={text} isValid={isValid} />, {});

    expect(queryByTestId('components/atom/Badge')).toHaveStyle(`
      background: ${theme.colors.bluegrey.pale};
      color: ${theme.colors.mediumgrey.dark};
    `);
  });
});
