import React, { useEffect, useState, useSyncExternalStore } from 'react';
import './styles/ToastContainer.css';
import ReactDOM from 'react-dom';
import Toast, { ToastProps } from './Toast';
import { toastManager, ToastItem, Position } from './ToastManager';

export interface ToastContainerProps {
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right';
}

//зачем топ райт? - оптимизация для самого частого сценария.удобства для быстрого старта.
const ToastContainer: React.FC<ToastContainerProps> = ({
  vertical = 'top',
  horizontal = 'right',
}) => {
  const allToasts = useSyncExternalStore(
    (cb) => toastManager.subscribe(cb),
    () => toastManager.getSnapshot(),
  );

  const toastToShow = allToasts.filter(
    (toast) => toast.position?.vertical === vertical && toast.position.horizontal === horizontal,
  );

  //6
  return ReactDOM.createPortal(
    <div className={`toast-container ${vertical}-${horizontal}`}>
      {toastToShow.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          //7
          onRemove={() => toastManager.removeToast(toast.id)}
          onClick={() => {
            if (!toast.exiting) toastManager.triggerRemoveToast(toast.id);
          }}
        />
      ))}
    </div>,
    document.body,
  );
};

export default ToastContainer;
