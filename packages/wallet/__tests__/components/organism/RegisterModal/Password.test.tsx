import RegisterModal from 'components/organism/RegisterModal';
import { RegisterFields } from 'interfaces/form';
import { FieldErrors, useForm } from 'react-hook-form';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { renderWithTheme } from 'testing-library';

interface IModalContentPropsWithoutUseForm {
  isButtonLoading?: boolean;
  errors?: FieldErrors<RegisterFields>
  onClickButton: () => void;
}

const mockStore = configureStore();

const PasswordWithUseForm = (props: IModalContentPropsWithoutUseForm) => {
  const { register, watch } = useForm<RegisterFields>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  return <RegisterModal.Password register={register} watch={watch} {...props} />;
};

describe('components/organism/RegisterModal.Password', () => {
  it('should render', () => {
    const initialState = {
      modal: {
        registerStage: 'password',
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
      <PasswordWithUseForm
        isButtonLoading={isButtonLoading}
        errors={errors}
        onClickButton={onClickButton}
      />,
      { wrapper },
    );

    expect(queryByText('Password')).toBeInTheDocument();
  });

  it('should not render when stage is not password', () => {
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
      <PasswordWithUseForm
        isButtonLoading={isButtonLoading}
        errors={errors}
        onClickButton={onClickButton}
      />,
      { wrapper },
    );

    expect(queryByText('Password')).not.toBeInTheDocument();
  });
});
