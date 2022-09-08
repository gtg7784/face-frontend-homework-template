import { PropsWithChildren, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import Modal from 'components/atom/Modal';
import ModalHeader from 'components/molecule/ModalHeader';
import { setTransactionStage } from 'store/modules/modal';
import FaceLogo from 'assets/face-logo.svg';
import Link from 'next/link';
import Tooltip from 'components/atom/Tooltip';
import {
  AvailableBalanceLabel,
  AvailableBalanceRow,
  AvailableBalanceValue,
  BlockBrowserLink,
  SecuredByContainer,
  SecuredByText,
  StyledButton,
  StyledCheckCircleIcon,
  StyledOpenInNewIcon,
  StyledSyncIcon,
  SubTitle,
  Title,
  TitleETH,
  TransactionInfo,
  TransactionInfoDivider,
  TransactionInfoLabel,
  TransactionInfoRow,
  TransactionInfoValue,
  TransactionInfoRowItemContainer,
  StyledHelpOutlineIcon,
  ErrorMessage,
} from './style';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  serviceSymbol: React.ReactElement;
  initialStage?: 'send' | 'processing' | 'complete';
}

interface ISendProps {
  balance: string;
  amount: string;
  to: string;
  fee: string;
  isButtonLoading: boolean;
  onClickButton: () => void;
}

interface IProcessingProps {
  amount: string;
  to: string;
  fee: string;
  hash: string;
}

interface ICompleteProps {
  amount: string;
  to: string;
  fee: string;
  hash: string;
}

const TransactionModal = ({
  isOpen,
  onClose,
  serviceSymbol,
  initialStage = 'send',
  children,
}: PropsWithChildren<IProps>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isOpen) {
      dispatch(setTransactionStage(initialStage));
    }
  }, [dispatch, isOpen, initialStage]);

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader
        serviceSymbol={serviceSymbol}
        onClose={onClose}
      />
      {children}
    </Modal>
  );
};

const Send = ({
  balance,
  amount,
  to,
  fee,
  isButtonLoading,
  onClickButton,
}: ISendProps) => {
  const { transactionStage: stage } = useAppSelector((state) => state.modal);
  const [insufficientFund, setInsufficientFund] = useState(0);

  useEffect(() => {
    setInsufficientFund(parseFloat(amount) + parseFloat(fee) - parseFloat(balance));
  }, [balance, amount, fee]);

  if (stage !== 'send') {
    return null;
  }

  return (
    <>
      <Title>Send</Title>
      <Title isMultiple hasError={insufficientFund > 0}>
        {balance}
        <TitleETH>ETH</TitleETH>
      </Title>
      <AvailableBalanceRow>
        <AvailableBalanceLabel>Available</AvailableBalanceLabel>
        <AvailableBalanceValue>
          {balance}
          {' '}
          ETH
        </AvailableBalanceValue>
      </AvailableBalanceRow>
      <TransactionInfo>
        <TransactionInfoRow>
          <TransactionInfoLabel>To</TransactionInfoLabel>
          <Tooltip message={`${to.slice(0, 23)}${'\n'}${to.slice(23)}`}>
            <TransactionInfoValue>
              {to.slice(0, 6)}
              ...
              {to.slice(-6)}
            </TransactionInfoValue>
          </Tooltip>
        </TransactionInfoRow>
        <TransactionInfoRow>
          <TransactionInfoLabel>Amount</TransactionInfoLabel>
          <TransactionInfoValue>
            {amount}
            {' '}
            ETH
          </TransactionInfoValue>
        </TransactionInfoRow>
        <TransactionInfoRow>
          <TransactionInfoRowItemContainer>
            <TransactionInfoLabel>Fee</TransactionInfoLabel>
            <Tooltip message={`The Ethereum network charges a transaction${'\n'}fee which varies based on blockchain usage.`}>
              <StyledHelpOutlineIcon />
            </Tooltip>
          </TransactionInfoRowItemContainer>
          <TransactionInfoValue>
            {fee}
            {' '}
            ETH
          </TransactionInfoValue>
        </TransactionInfoRow>
      </TransactionInfo>
      {
        insufficientFund > 0 && (
          <ErrorMessage>
            Insufficient funds
            {' '}
            {insufficientFund}
            {' '}
            ETH
          </ErrorMessage>
        )
      }
      <StyledButton
        onClick={onClickButton}
        disabled={insufficientFund > 0}
        isLoading={isButtonLoading}
      >
        Confirm
      </StyledButton>
      <SecuredByContainer>
        <SecuredByText>Secured By</SecuredByText>
        <FaceLogo width={99} height={12} />
      </SecuredByContainer>
    </>
  );
};

const Processing = ({
  to,
  amount,
  fee,
  hash,
}: IProcessingProps) => {
  const { transactionStage: stage } = useAppSelector((state) => state.modal);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(parseFloat(amount) + parseFloat(fee));
  }, [amount, fee]);

  if (stage !== 'processing') {
    return null;
  }

  return (
    <>
      <Title>Processing...</Title>
      <SubTitle>It should be confirmed on the blockchain shortly.</SubTitle>
      <TransactionInfo hasStatus>
        <TransactionInfoRow>
          <TransactionInfoLabel>Status</TransactionInfoLabel>
          <TransactionInfoRowItemContainer>
            <StyledSyncIcon />
            <TransactionInfoValue>Processing</TransactionInfoValue>
          </TransactionInfoRowItemContainer>
        </TransactionInfoRow>
        <TransactionInfoDivider />
        <TransactionInfoRow>
          <TransactionInfoLabel>To</TransactionInfoLabel>
          <Tooltip message={`${to.slice(0, 23)}${'\n'}${to.slice(23)}`}>
            <TransactionInfoValue>
              {to.slice(0, 6)}
              ...
              {to.slice(-6)}
            </TransactionInfoValue>
          </Tooltip>
        </TransactionInfoRow>
        <TransactionInfoRow>
          <TransactionInfoLabel>Amount</TransactionInfoLabel>
          <TransactionInfoValue>
            {amount}
            {' '}
            ETH
          </TransactionInfoValue>
        </TransactionInfoRow>
        <TransactionInfoRow>
          <TransactionInfoRowItemContainer>
            <TransactionInfoLabel>Fee</TransactionInfoLabel>
            <Tooltip message={`The Ethereum network charges a transaction${'\n'}fee which varies based on blockchain usage.`}>
              <StyledHelpOutlineIcon />
            </Tooltip>
          </TransactionInfoRowItemContainer>
          <TransactionInfoValue>
            {fee}
            {' '}
            ETH
          </TransactionInfoValue>
        </TransactionInfoRow>
        <TransactionInfoRow>
          <TransactionInfoLabel>Total</TransactionInfoLabel>
          <TransactionInfoValue>
            <strong>{total}</strong>
            {' '}
            ETH
          </TransactionInfoValue>
        </TransactionInfoRow>
      </TransactionInfo>
      <Link passHref href={`https://ropsten.etherscan.io/tx/${hash}`}>
        <BlockBrowserLink>
          View on block explorer
          <StyledOpenInNewIcon />
        </BlockBrowserLink>
      </Link>
      <SecuredByContainer>
        <SecuredByText>Secured By</SecuredByText>
        <FaceLogo width={99} height={12} />
      </SecuredByContainer>
    </>
  );
};

const Complete = ({
  to,
  amount,
  fee,
  hash,
}: ICompleteProps) => {
  const { transactionStage: stage } = useAppSelector((state) => state.modal);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(parseFloat(amount) + parseFloat(fee));
  }, [amount, fee]);

  if (stage !== 'complete') {
    return null;
  }

  return (
    <>
      <Title>Complete!</Title>
      <SubTitle>It&apos;s been confirmed on the blockchain!</SubTitle>
      <TransactionInfo hasStatus>
        <TransactionInfoRow>
          <TransactionInfoLabel>Status</TransactionInfoLabel>
          <TransactionInfoRowItemContainer>
            <StyledCheckCircleIcon />
            <TransactionInfoValue>Complete</TransactionInfoValue>
          </TransactionInfoRowItemContainer>
        </TransactionInfoRow>
        <TransactionInfoDivider />
        <TransactionInfoRow>
          <TransactionInfoLabel>To</TransactionInfoLabel>
          <Tooltip message={`${to.slice(0, 23)}${'\n'}${to.slice(23)}`}>
            <TransactionInfoValue>
              {to.slice(0, 6)}
              ...
              {to.slice(-6)}
            </TransactionInfoValue>
          </Tooltip>
        </TransactionInfoRow>
        <TransactionInfoRow>
          <TransactionInfoLabel>Amount</TransactionInfoLabel>
          <TransactionInfoValue>
            {amount}
            {' '}
            ETH
          </TransactionInfoValue>
        </TransactionInfoRow>
        <TransactionInfoRow>
          <TransactionInfoRowItemContainer>
            <TransactionInfoLabel>Fee</TransactionInfoLabel>
            <Tooltip message={`The Ethereum network charges a transaction${'\n'}fee which varies based on blockchain usage.`}>
              <StyledHelpOutlineIcon />
            </Tooltip>
          </TransactionInfoRowItemContainer>
          <TransactionInfoValue>
            {fee}
            {' '}
            ETH
          </TransactionInfoValue>
        </TransactionInfoRow>
        <TransactionInfoRow>
          <TransactionInfoLabel>Total</TransactionInfoLabel>
          <TransactionInfoValue>
            <strong>{total}</strong>
            {' '}
            ETH
          </TransactionInfoValue>
        </TransactionInfoRow>
      </TransactionInfo>
      <Link passHref href={`https://ropsten.etherscan.io/tx/${hash}`}>
        <BlockBrowserLink>
          View on block explorer
          <StyledOpenInNewIcon />
        </BlockBrowserLink>
      </Link>
      <SecuredByContainer>
        <SecuredByText>Secured By</SecuredByText>
        <FaceLogo width={99} height={12} />
      </SecuredByContainer>
    </>
  );
};

TransactionModal.Send = Send;
TransactionModal.Processing = Processing;
TransactionModal.Complete = Complete;

export default TransactionModal;
