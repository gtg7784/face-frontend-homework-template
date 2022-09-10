import TransactionModal from 'components/organism/TransactionModal';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { renderWithTheme } from 'testing-library';

const mockStore = configureStore();

describe('components/organism/TransactionModal.Processing', () => {
  it('should render', () => {
    const initialState = {
      modal: {
        transactionStage: 'processing',
      },
    };

    const store = mockStore(initialState);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    const amount = '10';
    const to = '0x5D5AA22d586b7904B2D348fad79b1eA3D0eeb520';
    const fee = '0.1';
    const hash = '0x5D5AA22d586b7904B2D348fad79b1eA3D0eeb520';

    const { queryByText } = renderWithTheme(
      <TransactionModal.Processing
        amount={amount}
        to={to}
        fee={fee}
        hash={hash}
      />,
      { wrapper },
    );

    expect(queryByText('Processing...')).toBeInTheDocument();
    expect(queryByText(`${amount} ETH`)).toBeInTheDocument();
    expect(queryByText(`${to.slice(0, 6)}...${to.slice(-6)}`)).toBeInTheDocument();
    expect(queryByText(`${fee} ETH`)).toBeInTheDocument();
    expect(queryByText(`${parseFloat(amount) + parseFloat(fee)}`)).toBeInTheDocument();
    expect(queryByText('View on block explorer')).toHaveAttribute('href', `https://ropsten.etherscan.io/tx/${hash}`);
  });

  it('should not render when stage is not processing', () => {
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

    const amount = '10';
    const to = '0x5D5AA22d586b7904B2D348fad79b1eA3D0eeb520';
    const fee = '0.1';
    const hash = '0x5D5AA22d586b7904B2D348fad79b1eA3D0eeb520';

    const { queryByText } = renderWithTheme(
      <TransactionModal.Processing
        amount={amount}
        to={to}
        fee={fee}
        hash={hash}
      />,
      { wrapper },
    );

    expect(queryByText('Processing...')).not.toBeInTheDocument();
  });
});
