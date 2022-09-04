import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { FaceSDK } from '@face/sdk';
import { useForm } from 'react-hook-form';
import Button from 'components/atom/Button';
import RegisterModal from 'components/organism/RegisterModal';
import { RegisterFields } from 'interfaces/form';
import FaceLogo from 'assets/face-logo.svg';
import OpenseaSymbol from 'assets/opensea-symbol.svg';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { setRegisterStage } from 'store/modules/modal';
import { setUser } from 'store/modules/user';
import useTimeout from 'hooks/useTimeout';
import TransactionModal from 'components/organism/TransactionModal';

const Home: NextPage = () => {
  const {
    register: registerFormRegister,
    watch: registerFormWatch,
    formState: { errors: registerFormErrors },
    setError: registerFormSetError,
    reset: registerFormReset,
    clearErrors: registerFormClearErrors,
  } = useForm<RegisterFields>({
    defaultValues: {
      email: '',
      verificationCode: '',
      password: '',
      passwordConfirmation: '',
    },
  });
  const dispatch = useAppDispatch();
  const { registerStage } = useAppSelector((state) => state.modal);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [
    isRegisterModalButtonLoading,
    setIsRegisterModalButtonLoading,
  ] = useState(false);
  const NODE_URL = 'https://ropsten.infura.io/v3/2a4f59ea8b174fb7ae9ed6fae1137e59';
  const faceSDK = useMemo(() => new FaceSDK(NODE_URL), []);

  useTimeout(() => {
    onCloseRegisterModal();
  }, registerStage === 'success' ? 3000 : null);

  const sendVerificationEmail = useCallback(async () => {
    const email = registerFormWatch('email');

    await faceSDK.sendVerificationEmail(email);
  }, [faceSDK, registerFormWatch]);

  const verifyEmail = useCallback(async () => {
    const subscription = registerFormWatch(async (value, { name }) => {
      const { verificationCode, email } = value;
      if (name === 'verificationCode' && verificationCode?.length === 6 && email) {
        const isVerificationSuccess = await faceSDK.verifyEmailVerificationCode(
          email,
          verificationCode,
        );

        if (!isVerificationSuccess) {
          registerFormSetError(name, { message: 'Invalid code.' });
        } else {
          registerFormClearErrors();
          dispatch(setRegisterStage('password'));
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch, faceSDK, registerFormClearErrors, registerFormSetError, registerFormWatch]);

  useEffect(() => {
    if (registerStage === 'verification') {
      sendVerificationEmail();
    }
  }, [registerStage, sendVerificationEmail]);

  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  const onCloseRegisterModal = () => {
    registerFormReset();
    setIsRegisterModalOpen(false);
  };

  const onClickRegisterLoginModalButton = async () => {
    const email = registerFormWatch('email');

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isEmailValid) {
      registerFormSetError('email', { message: 'Invalid email' });
      return;
    }

    const isEmailNotRegisterd = await faceSDK.checkEmail(email);

    if (!isEmailNotRegisterd) {
      registerFormSetError('email', { message: 'Email already registered' });
      return;
    }

    setIsRegisterModalButtonLoading(true);

    setTimeout(() => {
      registerFormClearErrors('email');
      setIsRegisterModalButtonLoading(false);
      dispatch(setRegisterStage('verification'));
    }, 500);
  };

  const onClickRegisterVerificationButton = () => {
    sendVerificationEmail();
  };

  const onClickRegisterPasswordButton = async () => {
    const email = registerFormWatch('email');
    const password = registerFormWatch('password');

    const user = await faceSDK.signUp({ email, password });

    if (user) {
      dispatch(setUser(user));
      dispatch(setRegisterStage('success'));
    }
  };

  return (
    <>
      <MainSection>
        <Title>Hello! This is Face Wallet</Title>
        <StyledButton onClick={() => setIsRegisterModalOpen(true)}>회원가입</StyledButton>
        <StyledButton onClick={() => setIsTransactionModalOpen(true)}>트랜잭션 전송</StyledButton>
        <SecuredByContainer>
          <SecuredByText>Secured By</SecuredByText>
          <FaceLogo width={99} height={12} />
        </SecuredByContainer>
      </MainSection>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={onCloseRegisterModal}
        serviceSymbol={<OpenseaSymbol width={48} height={48} />}
      >
        <RegisterModal.Login
          watch={registerFormWatch}
          register={registerFormRegister}
          errors={registerFormErrors}
          onClickButton={onClickRegisterLoginModalButton}
          isButtonLoading={isRegisterModalButtonLoading}
        />
        <RegisterModal.Verification
          isButtonLoading={isRegisterModalButtonLoading}
          register={registerFormRegister}
          errors={registerFormErrors}
          onClickButton={onClickRegisterVerificationButton}
        />
        <RegisterModal.Password
          register={registerFormRegister}
          watch={registerFormWatch}
          onClickButton={onClickRegisterPasswordButton}
        />
        <RegisterModal.Success />
      </RegisterModal>
    </>
  );
};

const MainSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
`;

const StyledButton = styled(Button)`
  margin: ${({ theme }) => theme.spacing.small['2']} 0;
`;

const SecuredByContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 19px;
  margin-top: ${({ theme }) => theme.spacing.medium['2']};
`;

const SecuredByText = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: ${({ theme }) => theme.colors.mediumgrey.dark};
  margin-right: ${({ theme }) => theme.spacing.small['1']};
`;

export default Home;
