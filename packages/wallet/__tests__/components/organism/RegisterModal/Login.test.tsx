import { faker } from '@faker-js/faker';
import RegisterModal from 'components/organism/RegisterModal';
import { RegisterFields } from 'interfaces/form';
import { FieldErrors, useForm } from 'react-hook-form';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { fireEvent, renderWithTheme } from 'testing-library';

interface IModalContentPropsWithoutUseForm {
  isButtonLoading?: boolean;
  errors?: FieldErrors<RegisterFields>
  onClickButton: () => void;
}

const mockStore = configureStore();

const LoginWithUseForm = (props: IModalContentPropsWithoutUseForm) => {
  const { register, watch } = useForm<RegisterFields>();

  return <RegisterModal.Login register={register} watch={watch} {...props} />;
};

describe('components/organism/RegisterModal.Login', () => {
  it('should render', () => {
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
    const isButtonLoading = false;
    const errors = {};
    const onClickButton = jest.fn();
    const { queryByText } = renderWithTheme(
      <LoginWithUseForm
        isButtonLoading={isButtonLoading}
        errors={errors}
        onClickButton={onClickButton}
      />,
      { wrapper },
    );

    expect(queryByText('Connect Face Wallet')).toBeInTheDocument();
  });

  it('should not render when stage is not login', () => {
    const initialState = {
      modal: {
        registerStage: 'verification',
      },
    };

    const store = mockStore(initialState);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    const isButtonLoading = false;
    const errors = {};
    const onClickButton = jest.fn();
    const { queryByText } = renderWithTheme(
      <LoginWithUseForm
        isButtonLoading={isButtonLoading}
        errors={errors}
        onClickButton={onClickButton}
      />,
      { wrapper },
    );

    expect(queryByText('Connect Face Wallet')).not.toBeInTheDocument();
  });

  it('should diplay error when error is passed', () => {
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

    const isButtonLoading = false;
    const errors = {
      email: {
        type: 'required',
        message: 'Email is required',
      },
    };
    const onClickButton = jest.fn();
    const { queryByText } = renderWithTheme(
      <LoginWithUseForm
        isButtonLoading={isButtonLoading}
        errors={errors}
        onClickButton={onClickButton}
      />,
      { wrapper },
    );

    expect(queryByText('Email is required')).toBeInTheDocument();
  });

  it('should call onClickButton when email is not empty', () => {
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

    const isButtonLoading = false;
    const errors = {};
    const onClickButton = jest.fn();
    const email = faker.internet.email();
    const { getByTestId } = renderWithTheme(
      <LoginWithUseForm
        isButtonLoading={isButtonLoading}
        errors={errors}
        onClickButton={onClickButton}
      />,
      { wrapper },
    );

    fireEvent.change(getByTestId('components/organism/RegisterModal/Login/EmailInput'), { target: { value: email } });
    fireEvent.click(getByTestId('components/organism/RegisterModal/Login/Button'));

    expect(onClickButton).toBeCalledTimes(1);
  });

  it('should not call onClickButton when email is empty', () => {
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

    const isButtonLoading = false;
    const errors = {};
    const onClickButton = jest.fn();
    const { getByTestId } = renderWithTheme(
      <LoginWithUseForm
        isButtonLoading={isButtonLoading}
        errors={errors}
        onClickButton={onClickButton}
      />,
      { wrapper },
    );

    fireEvent.click(getByTestId('components/organism/RegisterModal/Login/Button'));

    expect(onClickButton).not.toBeCalled();
  });
});
