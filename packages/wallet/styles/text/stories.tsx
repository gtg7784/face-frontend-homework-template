import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PropsWithChildren } from 'react';
import * as Text from '.';

type TextKeys = keyof typeof Text;

interface IProps {
  type: TextKeys;
}

const TextStyledComponent = styled.div<{ type: TextKeys }>`
  ${({ type }) => Text[type] ?? Text.body1Regular}
`;

const TextComponent = ({ children, type }: PropsWithChildren<IProps>) => (
  <TextStyledComponent type={type}>{children}</TextStyledComponent>
);

export default {
  title: 'Style/Text',
  component: TextComponent,
} as ComponentMeta<typeof TextComponent>;

const Template: ComponentStory<typeof TextComponent> = (args) => <TextComponent {...args} />;

export const Default = Template.bind({});
Default.argTypes = {
  type: {
    control: {
      type: 'select',
      options: Object.keys(Text),
    },
  },
};
Default.args = {
  children: 'Text',
};
