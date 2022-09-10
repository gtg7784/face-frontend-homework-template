import TransactionModal from 'components/organism/TransactionModal';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { renderWithTheme } from 'testing-library';
import theme from 'styles/theme';

const mockStore = configureStore();

describe('components/organism/TransactionModal.Send', () => {
  it('should render', () => {
    const initialState = {
      modal: {
        transactionStage: 'send',
      },
    };

    const store = mockStore(initialState);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    const balance = '100';
    const amount = '10';
    const to = '0x5D5AA22d586b7904B2D348fad79b1eA3D0eeb520';
    const fee = '0.1';
    const isButtonLoading = false;
    const onClickButton = jest.fn();

    const { queryByText } = renderWithTheme(
      <TransactionModal.Send
        balance={balance}
        amount={amount}
        to={to}
        fee={fee}
        isButtonLoading={isButtonLoading}
        onClickButton={onClickButton}
      />,
      { wrapper },
    );

    expect(queryByText('Send')).toBeInTheDocument();
    expect(queryByText(`${balance} ETH`)).toBeInTheDocument();
    expect(queryByText(`${amount} ETH`)).toBeInTheDocument();
    expect(queryByText(`${to.slice(0, 6)}...${to.slice(-6)}`)).toBeInTheDocument();
    expect(queryByText(`${fee} ETH`)).toBeInTheDocument();
  });

  it('should not render when stage is not send', () => {
    const initialState = {
      modal: {
        transactionStage: 'procssing',
      },
    };

    const store = mockStore(initialState);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    const balance = '100';
    const amount = '10';
    const to = '0x5D5AA22d586b7904B2D348fad79b1eA3D0eeb520';
    const fee = '0.1';
    const isButtonLoading = false;
    const onClickButton = jest.fn();

    const { queryByText } = renderWithTheme(
      <TransactionModal.Send
        balance={balance}
        amount={amount}
        to={to}
        fee={fee}
        isButtonLoading={isButtonLoading}
        onClickButton={onClickButton}
      />,
      { wrapper },
    );

    expect(queryByText('Send')).not.toBeInTheDocument();
  });

  it('should display error when amount is greater than balance', () => {
    const initialState = {
      modal: {
        transactionStage: 'send',
      },
    };

    const store = mockStore(initialState);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    const balance = '100';
    const amount = '101';
    const to = '0x5D5AA22d586b7904B2D348fad79b1eA3D0eeb520';
    const fee = '0.1';
    const isButtonLoading = false;
    const onClickButton = jest.fn();

    const { queryByText, queryByTestId } = renderWithTheme(
      <TransactionModal.Send
        balance={balance}
        amount={amount}
        to={to}
        fee={fee}
        isButtonLoading={isButtonLoading}
        onClickButton={onClickButton}
      />,
      { wrapper },
    );

    expect(queryByTestId('components/organism/TransactionModal/Send/TitleAmount')).toHaveStyle({
      color: theme.colors.red.dark,
    });
    expect(queryByText(`Insufficient funds ${parseFloat(amount) + parseFloat(fee) - parseFloat(balance)} ETH`)).toBeInTheDocument();
  });
});
