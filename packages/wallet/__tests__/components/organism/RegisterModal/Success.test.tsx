import RegisterModal from 'components/organism/RegisterModal';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { renderWithTheme } from 'testing-library';

const mockStore = configureStore();

describe('components/organism/RegisterModal.Success', () => {
  it('should render', () => {
    const initialState = {
      modal: {
        registerStage: 'success',
      },
    };

    const store = mockStore(initialState);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    const { queryByText } = renderWithTheme(
      <RegisterModal.Success />,
      { wrapper },
    );

    expect(queryByText('Success!')).toBeInTheDocument();
  });

  it('should not render when stage is not success', () => {
    const initialState = {
      modal: {
        registerStage: 'login',
      },
    };

    const store = mockStore(initialState);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    const { queryByText } = renderWithTheme(
      <RegisterModal.Success />,
      { wrapper },
    );

    expect(queryByText('Success!')).not.toBeInTheDocument();
  });
});
