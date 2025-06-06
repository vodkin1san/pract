import React from 'react';

const BuggyComponent: React.FC = () => {
  throw new Error('I crashed!');
  return <div>This text will never be displayed.</div>;
};

export default BuggyComponent;
