import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tooltip from '.';

export default {
  title: 'Atom/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'Tooltip',
  children: <div style={{ marginTop: '30px' }}>Hover Me</div>,
};
