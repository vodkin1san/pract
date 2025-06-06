import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ToastContainer from '../components/Toast/ToastContainer';
import { toastManager } from '../components/Toast/ToastManager';

const meta: Meta<typeof ToastContainer> = {
  title: 'Components/Demo',
  component: ToastContainer,
  parameters: {
    layout: 'fullscreen',
  },
};
type Story = StoryObj<typeof ToastContainer>;
//ToastContainer- создаёт место для тоста в рендере
export const Demo: Story = {
  render: () => {
    return (
      <>
        <ToastContainer vertical='top' horizontal='left' />
        <ToastContainer vertical='top' horizontal='right' />
        <ToastContainer vertical='bottom' horizontal='left' />
        <ToastContainer vertical='bottom' horizontal='right' />

        <div
          style={{
            // position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '15px',
            borderRadius: '8px',
            // boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <h3>Создать тосты:</h3>
          <button
            onClick={() => {
              toastManager
                .setPosition('left', 'bottom')
                .setType('info')
                .setTitle('Info Left bottom')
                .setDescription('Just first info')
                .setDuration(1000)
                .show();
            }}
          >
            Info Left bottom
          </button>
          <button
            onClick={() => {
              toastManager
                .setPosition('left', 'top')
                .setType('success')
                .setTitle('Success Left top')
                .setDescription('Just 2d info')
                .setDuration(1500)
                .show();
            }}
          >
            Success Left top
          </button>
          <button
            onClick={() => {
              toastManager
                .setPosition('right', 'bottom')
                .setType('warning')
                .setTitle('Warning Right 3d bottom')
                .setDescription('Just info')
                .setDuration(2000)
                .show();
            }}
          >
            Warning Right 3d bottom
          </button>
          <button
            onClick={() => {
              toastManager
                .setPosition('right', 'top')
                .setType('info')
                .setTitle('Info Right 4d top')
                .setDescription('Just info')
                .setDuration(2500)
                .show();
            }}
          >
            Just info
          </button>
        </div>
      </>
    );
  },
};

export default meta;
