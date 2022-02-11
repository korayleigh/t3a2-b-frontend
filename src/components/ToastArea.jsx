import React from 'react';
import { ToastContainer, Toast, Fade } from 'react-bootstrap';
import { deleteToast } from '../services/toastServices';
import { useGlobalContext } from '../utils/globalContext';
import taco32 from '../logo32.png';

const ToastArea = () => {

  const {globalStore, globalDispatch} = useGlobalContext();
  
  
  const handleDeleteToast = (toast) => {
    deleteToast(globalStore, globalDispatch, toast);
  };

  
  return (
    
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'fixed',
        minHeight: '100vh',
        minWidth: '100vw',
        pointerEvents: 'none',
        zIndex: '9999',
        height: '100%',
        width: '100%',
      }}
    >
      <ToastContainer position='top-end' className="p-4">
        {globalStore.toasts.map((toast, index) => {
          return (
            <Toast bg={toast.variant} key={index} delay={2000} show={toast.show} animation transition={Fade} autohide={true} onClose={() => handleDeleteToast(toast)}
              style={{
                transitionProperty: 'opacity, visibility',
                transitionDelay: '2s',
              }}
            >
              <Toast.Header>
                <img src={taco32} className="rounded me-2" alt="" />
                <strong className="me-auto">Mexiquito</strong>
                <small className="text-muted">just now</small>
              </Toast.Header>
              <Toast.Body
                style={{
                  color: 'white',
                }}
              >{toast.message}</Toast.Body>
            </Toast>
          );
        })}
      </ToastContainer>
    </div>
  );
};

export default ToastArea;