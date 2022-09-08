import {
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import Modal from 'components/atom/Modal';
import ModalHeader from 'components/molecule/ModalHeader';
import FaceLogo from 'assets/face-logo.svg';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { RegisterFields } from 'interfaces/form';
import { setRegisterStage } from 'store/modules/modal';
import useInterval from 'hooks/useInterval';
import Badge from 'components/atom/Badge';
import {
  SubTitle,
  SubTitleEmailPlaceholder,
  SecuredByContainer,
  SecuredByText,
  StyledButton,
  StyledEditIcon,
  StyledInput,
  SuccessSubTitle,
  SuccessTitle,
  Title,
  ErrorMessage,
  TimerText,
  BadgeContainer,
  TermsText,
  TermsTextLink,
  ResendCodeText,
  ResendCodeTextLink,
  StyledVisibilityIcon,
  StyledSyncIcon,
} from './styles';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  serviceSymbol: React.ReactElement;
  initialStage?: 'login' | 'verification' | 'password' | 'success';
}

interface IModalContentProps {
  isButtonLoading?: boolean;
  errors?: FieldErrors<RegisterFields>
  onClickButton: () => void;
  register: UseFormRegister<RegisterFields>;
  watch?: UseFormWatch<RegisterFields>;
}

const RegisterModal = ({
  isOpen,
  onClose,
  serviceSymbol,
  initialStage = 'login',
  children,
}: PropsWithChildren<IProps>) => {
  const dispatch = useAppDispatch();
  const { registerStage: stage } = useAppSelector((state) => state.modal);
  const [isServiceSymbolCentered, setIsServiceSymbolCenterd] = useState(false);

  useEffect(() => {
    setIsServiceSymbolCenterd(stage === 'success');
  }, [stage]);

  useEffect(() => {
    if (!isOpen) {
      dispatch(setRegisterStage(initialStage));
    }
  }, [dispatch, isOpen, initialStage]);

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader
        serviceSymbol={serviceSymbol}
        onClose={onClose}
        isServiceSymbolCentered={isServiceSymbolCentered}
      />
      {children}
    </Modal>
  );
};

const Login = ({
  isButtonLoading,
  errors,
  onClickButton,
  register,
  watch,
}: IModalContentProps) => {
  const { registerStage: stage } = useAppSelector((state) => state.modal);
  if (stage !== 'login' || !watch || !errors) {
    return null;
  }

  return (
    <>
      <Title>Connect Face Wallet</Title>
      <SubTitle>Enter the world of Web3 with Face</SubTitle>
      <StyledInput
        placeholder="satoshi@facewallet.xyz"
        {...register('email', { required: true })}
        type="email"
        data-testid="components/organism/RegisterModal/Login/EmailInput"
      />
      {errors.email?.message && (
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      )}
      <StyledButton
        onClick={onClickButton}
        disabled={!watch('email')}
        isLoading={isButtonLoading}
        data-testid="components/organism/RegisterModal/Login/Button"
      >
        Sign up / Login
      </StyledButton>
      <TermsText>
        By clicking the button, I acknowledge that I have read and agree to Face Wallet’s
        {' '}
        <TermsTextLink>Terms of Service</TermsTextLink>
        ,
        {' '}
        <TermsTextLink>Privacy Policy</TermsTextLink>
        {' '}
        and
        {' '}
        <TermsTextLink>Cookie Policy</TermsTextLink>
        {' '}
        in their entirety.
      </TermsText>
      <SecuredByContainer>
        <SecuredByText>Secured By</SecuredByText>
        <FaceLogo width={99} height={12} />
      </SecuredByContainer>
    </>
  );
};

const Verification = ({
  onClickButton,
  register,
  watch,
  errors,
}: IModalContentProps) => {
  const dispatch = useAppDispatch();
  const { registerStage: stage } = useAppSelector((state) => state.modal);
  const [timerSecond, setTimerSecond] = useState<number>(5 * 60);

  useInterval(() => {
    setTimerSecond((prev) => (
      prev - 1 > 0
        ? prev - 1
        : 0
    ));
  }, stage === 'verification' ? 1000 : null);

  if (stage !== 'verification' || !errors || !watch) {
    return null;
  }

  const onclickEmailInput = () => {
    dispatch(setRegisterStage('login'));
  };

  const onClickResendVerification = () => {
    setTimerSecond(5 * 60);
    onClickButton();
  };

  return (
    <>
      <Title>Email Verification</Title>
      <SubTitle>Enter code sent to</SubTitle>
      <StyledInput disabled type="email" {...register('email')} onClick={onclickEmailInput}>
        <StyledEditIcon />
      </StyledInput>
      {
        timerSecond > 0
          ? (
            <StyledInput placeholder="Enter verification code" {...register('verificationCode')}>
              {
                watch('verificationCode').length === 6
                  ? (
                    <StyledSyncIcon />
                  )
                  : (

                    <TimerText>
                      {Math.floor(timerSecond / 60).toString().padStart(2, '0')}
                      :
                      {(timerSecond % 60).toString().padStart(2, '0')}
                    </TimerText>
                  )
              }
            </StyledInput>
          )
          : (
            <StyledButton onClick={onClickResendVerification}>
              Resend verification code
            </StyledButton>
          )
      }
      {errors.verificationCode?.message && (
        <ErrorMessage>{errors.verificationCode?.message}</ErrorMessage>
      )}
      <ResendCodeText>
        Didn’t get a code?
        {' '}
        <ResendCodeTextLink onClick={onClickResendVerification}>Click to resend</ResendCodeTextLink>
        .
      </ResendCodeText>
      <SecuredByContainer>
        <SecuredByText>Secured By</SecuredByText>
        <FaceLogo width={99} height={12} />
      </SecuredByContainer>
    </>
  );
};

const Password = ({
  onClickButton,
  register,
  watch,
}: IModalContentProps) => {
  const { registerStage: stage } = useAppSelector((state) => state.modal);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] = useState(false);

  const onClickPasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onClickPasswordConfirmationVisibility = () => {
    setIsPasswordConfirmationVisible((prev) => !prev);
  };

  if (stage !== 'password' || !watch) {
    return null;
  }

  const passwordCondition: Record<string, boolean> = {
    '8+ chars': watch('password').length >= 8,
    Uppercase: watch('password').match(/[A-Z]/) !== null,
    Lowercase: watch('password').match(/[a-z]/) !== null,
    Number: watch('password').match(/[0-9]/) !== null,
    'Password Match': watch('password') === watch('passwordConfirmation') && watch('passwordConfirmation').length > 0,
  };

  return (
    <>
      <Title>Password</Title>
      <SubTitle>Almost done setting up your account</SubTitle>
      <SubTitleEmailPlaceholder>{watch('email')}</SubTitleEmailPlaceholder>
      <StyledInput placeholder="Enter password" type={isPasswordVisible ? 'text' : 'password'} {...register('password')}>
        <StyledVisibilityIcon onClick={onClickPasswordVisibility} />
      </StyledInput>
      <StyledInput placeholder="Re-enter password" type={isPasswordConfirmationVisible ? 'text' : 'password'} {...register('passwordConfirmation')} isMultiple>
        <StyledVisibilityIcon onClick={onClickPasswordConfirmationVisibility} />
      </StyledInput>
      <BadgeContainer>
        {Object.keys(passwordCondition).map((key) => (
          <Badge key={key} isValid={passwordCondition[key]} text={key} />
        ))}
      </BadgeContainer>
      <StyledButton
        onClick={onClickButton}
        disabled={!Object.values(passwordCondition).every((v) => v)}
      >
        Sign up
      </StyledButton>
      <SecuredByContainer>
        <SecuredByText>Secured By</SecuredByText>
        <FaceLogo width={99} height={12} />
      </SecuredByContainer>
    </>
  );
};

const Success = () => {
  const { registerStage: stage } = useAppSelector((state) => state.modal);

  if (stage !== 'success') {
    return null;
  }

  return (
    <>
      <SuccessTitle>Success!</SuccessTitle>
      <SuccessSubTitle>Your account ready for use</SuccessSubTitle>
      <SecuredByContainer>
        <SecuredByText>Secured By</SecuredByText>
        <FaceLogo width={99} height={12} />
      </SecuredByContainer>
    </>
  );
};

RegisterModal.Login = Login;
RegisterModal.Verification = Verification;
RegisterModal.Password = Password;
RegisterModal.Success = Success;

export default RegisterModal;
