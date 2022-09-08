import styled, { keyframes } from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SyncIcon from '@mui/icons-material/Sync';
import Input from 'components/atom/Input';
import Button from 'components/atom/Button';
import * as textStyle from 'styles/text';

export const Title = styled.h1`
  width: 100%;
  ${textStyle.h3}
  color: ${({ theme }) => theme.colors.bluegrey.dark};
  margin-top: ${({ theme }) => theme.spacing.small['2']};
  margin-bottom: 0;
`;

export const SubTitle = styled.p`
  width: 100%;
  ${textStyle.body2Regular}
  color: ${({ theme }) => theme.colors.bluegrey.main};
  margin: 0;
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

export const SubTitleEmailPlaceholder = styled.p`
  width: 100%;
  ${textStyle.body2Bold}
  color: ${({ theme }) => theme.colors.bluegrey.main};
  margin: 0;
`;

export const SuccessTitle = styled(Title)`
  text-align: center;
`;

export const SuccessSubTitle = styled(SubTitle)`
  text-align: center;
`;

export const StyledInput = styled(Input)<{ isMultiple?: boolean }>`
  margin-top: ${({ theme, isMultiple }) => (isMultiple ? theme.spacing.small['2'] : theme.spacing.small['6'])};
`;

export const StyledButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.small['6']};
`;

export const StyledEditIcon = styled(EditIcon)`
  width: 16px !important;
  height: 16px !important;
  color: ${({ theme }) => theme.colors.bluegrey.sub};
`;

export const StyledVisibilityIcon = styled(VisibilityIcon)`
  width: 24px !important;
  height: 24px !important;
  color: ${({ theme }) => theme.colors.bluegrey.dark};
`;

export const TermsText = styled.p`
  width: 288px;
  ${textStyle.captionRegular}
  color: ${({ theme }) => theme.colors.darkgrey.pale};
  margin-top: ${({ theme }) => theme.spacing.small['4']};
  margin-bottom: 0;
`;

export const TermsTextLink = styled.a`
  ${textStyle.captionRegular}
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
`;

export const ResendCodeText = styled.p`
  width: 288px;
  text-align: center;
  ${textStyle.body3Regular}
  color: ${({ theme }) => theme.colors.darkgrey.pale};
  margin-top: ${({ theme }) => theme.spacing.small['4']};
  margin-bottom: 0;
`;

export const ResendCodeTextLink = styled.a`
  ${textStyle.body3Regular}
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
`;

export const ErrorMessage = styled.p`
  width: 288px;
  text-align: left;
  ${textStyle.body2Regular}
  color: ${({ theme }) => theme.colors.red.dark};
  margin-top: ${({ theme }) => theme.spacing.small['2']};
  margin-bottom: 0;
`;

export const TimerText = styled.span`
  ${textStyle.body1Regular}
  color: ${({ theme }) => theme.colors.primary.main};
`;

export const BadgeContainer = styled.div`
  width: 288px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small['1']};
  margin-top: ${({ theme }) => theme.spacing.small['2']};
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
  width: 24px !important;
  height: 24px !important;
  animation: ${rotate} 1s linear infinite;
  margin-right: ${({ theme }) => theme.spacing.small['2']};
  color: ${({ theme }) => theme.colors.primary.main};
`;
