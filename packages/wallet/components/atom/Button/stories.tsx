import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '.';

export default {
  title: 'Atom/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  disabled: false,
  isLoading: false,
};
Default.argTypes = {
  onClick: {
    action: 'clicked',
  },
};
