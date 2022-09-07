import { faker } from '@faker-js/faker';
import Button from 'components/atom/Button';
import { renderWithTheme } from 'testing-library';

describe('components/atom/Button', () => {
  it('should render', () => {
    const text = faker.lorem.word();
    const { queryByTestId } = renderWithTheme(<Button>{text}</Button>, {});

    expect(queryByTestId('components/atom/Button')).toBeInTheDocument();
    expect(queryByTestId('components/atom/Button')).toHaveTextContent(text);
  });

  it('should render when disabled', () => {
    const text = faker.lorem.word();
    const { queryByTestId } = renderWithTheme(<Button disabled>{text}</Button>, {});

    expect(queryByTestId('components/atom/Button')).toHaveAttribute('disabled');
  });

  it('should render when loading', () => {
    const text = faker.lorem.word();
    const { queryByTestId } = renderWithTheme(<Button isLoading>{text}</Button>, {});

    expect(queryByTestId('components/atom/Button')).toHaveAttribute('disabled');
    expect(queryByTestId('components/atom/Button')).toHaveTextContent(text);
    expect(queryByTestId('components/atom/Button')).toContainElement(queryByTestId('components/atom/Button/SyncIcon'));
  });
});
