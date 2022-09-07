import { faker } from '@faker-js/faker';
import Tooltip from 'components/atom/Tooltip';
import { fireEvent, renderWithTheme } from 'testing-library';

describe('components/atom/Tooltip', () => {
  it('should render', () => {
    const message = faker.lorem.word();
    const { queryByTestId } = renderWithTheme(
      <Tooltip message={message}>
        <div>children</div>
      </Tooltip>,
      {},
    );

    expect(queryByTestId('components/atom/Tooltip')).toBeInTheDocument();
  });

  it('should display when children is hover', () => {
    const message = faker.lorem.word();
    const { queryByTestId, getByText } = renderWithTheme(
      <Tooltip message={message}>
        <div>children</div>
      </Tooltip>,
      {},
    );

    fireEvent.mouseOver(getByText('children'));

    expect(queryByTestId('components/atom/Tooltip')).toBeInTheDocument();
    expect(queryByTestId('components/atom/Tooltip/Message')).toHaveTextContent(message);
  });

  it('should not display when children is not hover', () => {
    const message = faker.lorem.word();
    const { queryByTestId, getByText } = renderWithTheme(
      <Tooltip message={message}>
        <div>children</div>
      </Tooltip>,
      {},
    );

    fireEvent.mouseOut(getByText('children'));

    expect(queryByTestId('components/atom/Tooltip')).toBeInTheDocument();
    expect(queryByTestId('components/atom/Tooltip/Message')).not.toBeVisible();
  });
});
