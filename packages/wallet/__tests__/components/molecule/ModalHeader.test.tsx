import ModalHeader from 'components/molecule/ModalHeader';
import { fireEvent, renderWithTheme } from 'testing-library';

describe('components/molecule/ModalHeader', () => {
  it('should render', () => {
    const serviceSymbol = <div />;
    const onClose = jest.fn();
    const { queryByTestId } = renderWithTheme(
      <ModalHeader serviceSymbol={serviceSymbol} onClose={onClose} />,
      {},
    );

    expect(queryByTestId('components/molecule/ModalHeader')).toBeInTheDocument();
  });

  it('should fire onClose', () => {
    const serviceSymbol = <div />;
    const onClose = jest.fn();
    const { getByTestId } = renderWithTheme(
      <ModalHeader serviceSymbol={serviceSymbol} onClose={onClose} />,
      {},
    );

    fireEvent.click(getByTestId('components/molecule/ModalHeader/CloseButton'));

    expect(onClose).toBeCalledTimes(1);
  });
});
