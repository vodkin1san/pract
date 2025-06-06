import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Toast, { ToastProps } from '../components/Toast/Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
};
export default meta;
type Story = StoryObj<ToastProps>;

export const Default: Story = {
  render: (args) => <Toast {...args} />,
  args: {
    title: 'Notification Title',
    description: 'This is a sample notifica tion body.',
    type: 'info',
    animation: 'fade',
    backgroundColor: '#ffffff',
  },
};
export const Warning: Story = {
  render: (args) => <Toast {...args} />,
  args: {
    title: 'Attention!',
    description: 'This is a warning notification.',
    type: 'warning',
    animation: 'slide',
    backgroundColor: '#ffda00',
  },
};

export const Success: Story = {
  render: (args) => <Toast {...args} />,
  args: {
    title: 'Awesome!',
    description: 'This is a success notification.',
    type: 'success',
    animation: 'fade',
    backgroundColor: 'white',
  },
};
