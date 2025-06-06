import React, { useState, useEffect } from 'react';
import './styles/Toast.css';

export interface ToastProps {
  title?: string;
  description?: string;
  type?: 'info' | 'warning' | 'success';
  animation?: string;
  backgroundColor?: string;
  duration?: number;
  exiting?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
}
const Toast: React.FC<ToastProps> = ({
  title,
  description,
  type = 'info',
  animation = 'fade',
  backgroundColor = '#fff',
  onRemove,
  exiting = false,
  onClick,
}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);
  let animationClass = '';
  if (exiting) {
    animationClass = `toast-exit-${animation}`;
  } else {
    animationClass = visible ? `toast-enter-${animation}` : '';
  }

  const handleAnimationEnd = () => {
    if (exiting && onRemove) {
      onRemove();
    }
  };

  return (
    <div
      className={`toast ${type} ${animationClass}`}
      style={{ backgroundColor }}
      onAnimationEnd={handleAnimationEnd}
      onClick={onClick}
    >
      {title && <div className='toats-header'>{title}</div>}
      {description && <div className='toats-body'>{description}</div>}
    </div>
  );
};
export default Toast;
