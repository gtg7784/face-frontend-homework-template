import styled, { keyframes } from 'styled-components';
import Button from 'components/atom/Button';
import SyncIcon from '@mui/icons-material/Sync';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import * as textStyle from 'styles/text';

export const Title = styled.h1<{ isMultiple?: boolean; hasError?: boolean }>`
  width: 100%;
  ${textStyle.h3}
  color: ${({ theme, hasError }) => (hasError ? theme.colors.red.dark : theme.colors.bluegrey.dark)};
  margin-top: ${({ theme, isMultiple }) => (isMultiple ? theme.spacing.small['1'] : theme.spacing.small['2'])};
  margin-bottom: 0;
`;

export const TitleETH = styled.span`
  ${textStyle.h3}
  color: ${({ theme }) => theme.colors.darkgrey.light};
  margin-left: 6px;
`;

export const SubTitle = styled.p`
  width: 100%;
  ${textStyle.body2Regular}
  color: ${({ theme }) => theme.colors.bluegrey.main};
  margin: 0;
`;

export const AvailableBalanceRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 288px;
  height: 54px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.mediumgrey.sub};
  padding: ${({ theme }) => theme.spacing.small['4']};
  margin-top: ${({ theme }) => theme.spacing.small['6']};
`;

export const AvailableBalanceLabel = styled.span`
  ${textStyle.body2Regular}
  color: ${({ theme }) => theme.colors.darkgrey.sub};
`;

export const AvailableBalanceValue = styled.span`
  word-spacing: 5px;
  word-break: keep-all;
  ${textStyle.body2Medium}
  color: ${({ theme }) => theme.colors.darkgrey.sub};
`;

export const TransactionInfo = styled.div<{ hasStatus?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 288px;
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.small['4']};
  padding-bottom: 0;
  background: ${({ theme }) => theme.colors.lightgrey.main};
  margin-top: ${({ theme, hasStatus }) => (hasStatus ? theme.spacing.small['6'] : theme.spacing.small['2'])};
`;

export const TransactionInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.small['4']};
`;

export const TransactionInfoLabel = styled.span`
  ${textStyle.body2Regular}
  color: ${({ theme }) => theme.colors.darkgrey.sub};
`;

export const TransactionInfoValue = styled.span`
  ${textStyle.body2Medium}
  color: ${({ theme }) => theme.colors.darkgrey.sub};

  & > strong {
    ${textStyle.body2Medium}
    font-weight: 700;
    color: ${({ theme }) => theme.colors.darkgrey.main};
  }
`;

export const TransactionInfoRowItemContainer = styled.div`
  display: flex;
  flex-direciton: row;
  align-items: center;
`;

export const TransactionInfoDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.mediumgrey.sub};
  margin-bottom: ${({ theme }) => theme.spacing.small['4']};`;

export const StyledButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.small['6']};
`;

export const SecuredByContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 19px;
  margin-top: ${({ theme }) => theme.spacing.medium['2']};
`;

export const SecuredByText = styled.span`
  ${textStyle.body3Medium}
  color: ${({ theme }) => theme.colors.mediumgrey.dark};
  margin-right: ${({ theme }) => theme.spacing.small['1']};
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const StyledSyncIcon = styled(SyncIcon)`
  animation: ${rotate} 1s linear infinite;
  margin-right: ${({ theme }) => theme.spacing.small['1']};
  color: ${({ theme }) => theme.colors.primary.main};
  width: 20px !important;
  height: 20px !important;
`;

export const BlockBrowserLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 32px;
  text-decoration: none;
  ${textStyle.btn2}
  color: ${({ theme }) => theme.colors.bluegrey.sub};
  margin-top: ${({ theme }) => theme.spacing.small['6']};
`;

export const ErrorMessage = styled.p`
  width: 288px;
  text-align: center;
  ${textStyle.body2Regular}
  color: ${({ theme }) => theme.colors.red.dark};
  margin-top: ${({ theme }) => theme.spacing.small['4']};
  margin-bottom: 0
`;

export const StyledOpenInNewIcon = styled(OpenInNewIcon)`
  width: 20px !important;
  height: 20px !important;
  margin-left: ${({ theme }) => theme.spacing.small['1']};
`;

export const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  width: 20px !important;
  height: 20px !important;
  margin-right: ${({ theme }) => theme.spacing.small['1']};
  color: ${({ theme }) => theme.colors.green.main};
`;

export const StyledHelpOutlineIcon = styled(HelpOutlineIcon)`
  width: 20px !important;
  height: 20px !important;
  margin-left: ${({ theme }) => theme.spacing.small['1']};
  color: ${({ theme }) => theme.colors.mediumgrey.dark};
`;
