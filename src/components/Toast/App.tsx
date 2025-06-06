import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import ToastContainer from './ToastContainer';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ToastContainer vertical='top' horizontal='right' />
    </ErrorBoundary>
  );
};

export default App;
