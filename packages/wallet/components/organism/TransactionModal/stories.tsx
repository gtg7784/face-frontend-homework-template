import { ComponentStory, ComponentMeta } from '@storybook/react';
import OpenseaSymbol from 'assets/opensea-symbol.svg';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import useTimeout from 'hooks/useTimeout';
import { setTransactionStage } from 'store/modules/modal';
import TransactionModal from '.';

export default {
  title: 'Organism/TransactionModal',
  component: TransactionModal,
  args: {
    serviceSymbol: <OpenseaSymbol width={48} height={48} />,
    isOpen: false,
  },
} as ComponentMeta<typeof TransactionModal>;

const Template: ComponentStory<typeof TransactionModal> = (args) => {
  const { transactionStage: stage } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  useTimeout(() => {
    dispatch(setTransactionStage('complete'));
  }, stage === 'processing' ? 3000 : 0);

  return (
    <div>
      <TransactionModal {...args}>
        <TransactionModal.Send
          balance="111.00"
          amount="1.9"
          fee="0.1"
          to="0x5D5AA22d586b7904B2D348fad79b1eA3D0eeb520"
          onClickButton={() => dispatch(setTransactionStage('processing'))}
          isButtonLoading={false}
        />
        <TransactionModal.Processing
          amount="1.9"
          fee="0.1"
          to="0x5D5AA22d586b7904B2D348fad79b1eA3D0eeb520"
          hash="0x71475b79f3c094c73ef1140e76cb1e609e3c921e3a34a86ca2b82393d50e6fdb"
        />
        <TransactionModal.Complete
          amount="1.9"
          fee="0.1"
          to="0x5D5AA22d586b7904B2D348fad79b1eA3D0eeb520"
          hash="0x71475b79f3c094c73ef1140e76cb1e609e3c921e3a34a86ca2b82393d50e6fdb"
        />
      </TransactionModal>
    </div>
  );
};

export const Default = Template.bind({});
Default.argTypes = {
  onClose: {
    action: 'closed',
  },
  initialStage: {
    control: {
      type: 'select',
      options: ['send', 'processing', 'complete'],
    },
  },
};

Default.args = {
  initialStage: 'send',
};
