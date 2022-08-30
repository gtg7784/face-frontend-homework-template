import { ComponentStory, ComponentMeta } from '@storybook/react';
import OpenseaSymbol from 'assets/opensea-symbol.svg';
import ModalHeader from '.';

export default {
  title: 'Molecule/ModalHeader',
  component: ModalHeader,
} as ComponentMeta<typeof ModalHeader>;

const Template: ComponentStory<typeof ModalHeader> = (args) => (
  <div>
    <ModalHeader {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  serviceSymbol: <OpenseaSymbol width={48} height={48} />,
};

Default.argTypes = {
  serviceSymbol: {
    type: 'symbol',
  },
  onClose: {
    type: 'function',
    action: 'closed',
  },
};
