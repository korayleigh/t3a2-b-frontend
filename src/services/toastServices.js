
export const showToast = (store, dispatch, message, variant) => {

  const newToast =  {
    message: message,
    variant: variant,
    show: true
  };

  dispatch({
    type: 'setToasts',
    data: [
      ...store.toasts,  
      newToast
    ]
  });

};

export const deleteToast = (store, dispatch, toastToDelete) => {
  dispatch({
    type: 'setToasts',
    data: store.toasts.filter((toast) => {
      return toast !== toastToDelete;
    })
  });
};
