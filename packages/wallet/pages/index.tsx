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
import { setRegisterStage, setTransactionStage } from 'store/modules/modal';
import { setUser } from 'store/modules/user';
import useTimeout from 'hooks/useTimeout';
import TransactionModal from 'components/organism/TransactionModal';
import { ethers } from 'ethers';

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
    isRegisterModalLoginButtonLoading,
    setIsRegisterModalLoginButtonLoading,
  ] = useState(false);
  const [
    isTransactionModalOpenButtonLoading,
    setIsTransactionModalOpenButtonLoading,
  ] = useState(false);
  const [
    isTransactionModalSendButtonLoading,
    setIsTransactionModalSendButtonLoading,
  ] = useState(false);
  const [accountBalance, setAccountBalance] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionSendTo, setTransactionSendTo] = useState('');
  const [transactionFee, setTransactionFee] = useState('');
  const [transaction, setTransaction] = useState<ethers.providers.TransactionRequest>();
  const [transactionHash, setTransactionHash] = useState('');
  const NODE_URL = 'https://ropsten.infura.io/v3/2a4f59ea8b174fb7ae9ed6fae1137e59';
  const faceSDK = useMemo(() => new FaceSDK(NODE_URL), []);
  const provider = new ethers.providers.Web3Provider(faceSDK.getProvider());

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

  useEffect(() => {
    // 이부분을 바꾸면 transaction address 와 amount 가 변경됩니다.
    setTransactionSendTo('0x5D5AA22d586b7904B2D348fad79b1eA3D0eeb520');
    setTransactionAmount('0.123456');
  }, []);

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

    setIsRegisterModalLoginButtonLoading(true);

    setTimeout(() => {
      registerFormClearErrors('email');
      setIsRegisterModalLoginButtonLoading(false);
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

  const onClickSendTransactionButton = async () => {
    setIsTransactionModalOpenButtonLoading(true);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const balance = ethers.utils.formatEther(await provider.getBalance(address));
    const gasPrice = await provider.getGasPrice();
    const txRequest = {
      to: transactionSendTo,
      value: ethers.utils.parseEther(transactionAmount),
    };
    const tx = await signer.populateTransaction(txRequest);
    const gasUnits = await provider.estimateGas(tx);
    const feeGwei = gasPrice.mul(gasUnits);
    const feeEth = ethers.utils.formatUnits(feeGwei, 'ether');

    setAccountBalance(balance);
    setTransactionFee(feeEth);
    setTransaction(tx);
    setIsTransactionModalOpen(true);
    setIsTransactionModalOpenButtonLoading(false);
  };

  const onClickTransactionModalSendButton = async () => {
    setIsTransactionModalSendButtonLoading(true);
    const signer = provider.getSigner();

    if (transaction) {
      const tx = await signer.sendTransaction(transaction);
      setTransactionHash(tx.hash);

      dispatch(setTransactionStage('processing'));
      const receipt = await tx.wait();

      console.log('receipt', receipt);
      setIsRegisterModalLoginButtonLoading(false);

      if (receipt.status) {
        dispatch(setTransactionStage('complete'));
      }
    }
  };

  return (
    <>
      <MainSection>
        <Title>Hello! This is Face Wallet</Title>
        <StyledButton onClick={() => setIsRegisterModalOpen(true)}>회원가입</StyledButton>
        <StyledButton
          onClick={onClickSendTransactionButton}
          isLoading={isTransactionModalOpenButtonLoading}
        >
          트랜잭션 전송
        </StyledButton>
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
          isButtonLoading={isRegisterModalLoginButtonLoading}
        />
        <RegisterModal.Verification
          isButtonLoading={isRegisterModalLoginButtonLoading}
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
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        serviceSymbol={<OpenseaSymbol width={48} height={48} />}
      >
        <TransactionModal.Send
          balance={accountBalance}
          amount={transactionAmount}
          to={transactionSendTo}
          fee={transactionFee}
          isButtonLoading={isTransactionModalSendButtonLoading}
          onClickButton={onClickTransactionModalSendButton}
        />
        <TransactionModal.Processing
          amount={transactionAmount}
          to={transactionSendTo}
          fee={transactionFee}
          hash={transactionHash}
        />
        <TransactionModal.Complete
          amount={transactionAmount}
          to={transactionSendTo}
          fee={transactionFee}
          hash={transactionHash}
        />
      </TransactionModal>
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
  margin-bottom: ${({ theme }) => theme.spacing.medium['2']};
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
