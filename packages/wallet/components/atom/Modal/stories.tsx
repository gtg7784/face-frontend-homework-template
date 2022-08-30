import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal from '.';

export default {
  title: 'Atom/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <div>
    <Modal {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: '1234',
  isOpen: false,
};
