import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ErrorBoundary from '../components/Toast/ErrorBoundary';
import BuggyComponent from '../components/Toast/BuggyComponent';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary Demo',
  component: ErrorBoundary,
};

type Story = StoryObj<typeof ErrorBoundary>;

export const FallbackUI: Story = {
  render: () => (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  ),
};

export default meta;
