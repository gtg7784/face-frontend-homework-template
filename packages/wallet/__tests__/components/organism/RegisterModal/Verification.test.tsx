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

const VerificationWithUseForm = (props: IModalContentPropsWithoutUseForm) => {
  const { register, watch } = useForm<RegisterFields>({
    defaultValues: {
      verificationCode: '',
    },
  });

  return <RegisterModal.Verification register={register} watch={watch} {...props} />;
};

describe('components/organism/RegisterModal.Verification', () => {
  it('should render', () => {
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
      <VerificationWithUseForm
        isButtonLoading={isButtonLoading}
        errors={errors}
        onClickButton={onClickButton}
      />,
      { wrapper },
    );

    expect(queryByText('Email Verification')).toBeInTheDocument();
  });

  it('should not render when stage is not verification', () => {
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
      <VerificationWithUseForm
        isButtonLoading={isButtonLoading}
        errors={errors}
        onClickButton={onClickButton}
      />,
      { wrapper },
    );

    expect(queryByText('Email Verification')).not.toBeInTheDocument();
  });

  // it('should display Resnd verification code Button after 5 miniutes', async () => {
  //   jest.useFakeTimers();
  //   jest.spyOn(global, 'setInterval');

  //   const initialState = {
  //     modal: {
  //       registerStage: 'verification',
  //     },
  //   };

  //   const store = mockStore(initialState);

  //   const wrapper = ({ children }: { children: React.ReactNode }) => (
  //     <Provider store={store}>
  //       {children}
  //     </Provider>
  //   );
  //   const isButtonLoading = false;
  //   const errors = {};
  //   const onClickButton = jest.fn();
  //   const { queryByText, queryByTestId } = await waitFor(async () => renderWithTheme(
  //     <VerficiationWithUseForm
  //       isButtonLoading={isButtonLoading}
  //       errors={errors}
  //       onClickButton={onClickButton}
  //     />,
  //     { wrapper },
  //   ));

  //   expect(queryByText('Resend verification code')).not.toBeInTheDocument();

  //   jest.advanceTimersByTime(60 * 1000);

  //   console.log(queryByTestId('1234')?.innerHTML);
  //   jest.advanceTimersByTime(4 * 60 * 1000);
  //   console.log(queryByTestId('1234')?.innerHTML);

  //   expect(queryByText('Resend verification code')).toBeInTheDocument();
  //   jest.useRealTimers();
  // });
});
