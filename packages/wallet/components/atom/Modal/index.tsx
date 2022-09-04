import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

interface IProps {
  isOpen: boolean;
}

const Modal = ({ children, ...props }: PropsWithChildren<IProps>) => {
  ReactModal.setAppElement('#root');

  return (
    <ReactModal
      className="_"
      overlayClassName="_"
      contentElement={ContentElement}
      overlayElement={OverlayElement}
      {...props}
    >
      {children}
    </ReactModal>
  );
};

const ContentElement = (props: React.ComponentPropsWithRef<'div'>, children: React.ReactNode) => (
  <StyledContentElement {...props}>{children}</StyledContentElement>
);

const OverlayElement = (props: React.ComponentPropsWithRef<'div'>, children: React.ReactNode) => (
  <StyledOverlayElement {...props}>{children}</StyledOverlayElement>
);

const StyledContentElement = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 16px;
  outline: none;
  padding: 36px; // design system 기준 spacing 몇인지 모르겠음
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.evaluation.level5};
`;

const StyledOverlayElement = styled.div`
  position: fixed;
  inset: 0px;
  // bacground 의 마지막 59 -> 0.35
  background: ${({ theme }) => theme.colors.darkgrey.dark}59;
`;

export default Modal;
