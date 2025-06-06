import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ToastContainer from '../components/Toast/ToastContainer';
import { toastManager } from '../components/Toast/ToastManager';

const meta: Meta = {
  title: 'Components/Multiple Toast',
  component: ToastContainer,
};
export default meta;

type Story = StoryObj;

export const MultipleToast: Story = {
  render: () => {
    return (
      <div>
        <ToastContainer vertical='top' horizontal='right' />
        <button
          style={{ marginTop: '20px', padding: '10px 20px' }}
          onClick={() => {
            // Пытаемся добавить 5 уведомлений сразу
            for (let i = 0; i < 5; i++) {
              toastManager
                .setPosition('right', 'top')
                .setType('info')
                .setTitle(`Toast #${i + 1}`)
                .setDescription(`Notification number ${i + 1}`)
                .setAnimation('fade')
                .setDuration(3000)
                .show();
            }
          }}
        >
          Show Multiple Toast
        </button>
      </div>
    );
  },
};
