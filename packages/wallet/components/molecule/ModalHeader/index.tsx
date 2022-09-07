import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  serviceSymbol: React.ReactElement;
  isServiceSymbolCentered?: boolean;
  onClose: () => void;
}

const ModalHeader = ({ serviceSymbol, isServiceSymbolCentered, onClose }: IProps) => (
  <Container data-testid="components/molecule/ModalHeader">
    {isServiceSymbolCentered && <Spacing />}
    {serviceSymbol}
    <CloseButton onClick={onClose} data-testid="components/molecule/ModalHeader/CloseButton">
      <StyledCloseIcon />
    </CloseButton>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 288px;
  height: 48px;
  background: ${({ theme }) => theme.colors.white};
`;

const Spacing = styled.div`
  width: ${({ theme }) => theme.spacing.small['6']};
  height: ${({ theme }) => theme.spacing.small['6']};
`;

const CloseButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${({ theme }) => theme.colors.white};
`;

const StyledCloseIcon = styled(CloseIcon)`
  width: 24px !important;
  height: 24px !important;
  color: ${({ theme }) => theme.colors.darkgrey.light};
`;

export default ModalHeader;
