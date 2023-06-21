import { toast } from 'react-toastify';

export const log = (err: unknown): void => {
  console.error(JSON.stringify(err, null, 4));
  console.clear();
  console.log(Array(100).join('\n'));
};

type toastMode = 'info' | 'success' | 'error' | 'default';
export const showToast = (mode: toastMode, message: string): void => {
  switch (mode) {
    case 'info':
      toast.info(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
      break;
    case 'success':
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
      break;
    case 'error':
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
      break;
    case 'default':
      toast(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
      break;
  }
};

export const showError = (err: unknown): void => {
  let message = 'Something is wrong. Please try again or contact us if issue persists.';
  if (
    err !== undefined &&
    err !== null &&
    typeof err === 'object' &&
    'response' in err &&
    err.response !== undefined &&
    err.response !== null &&
    typeof err.response === 'object' &&
    'data' in err.response &&
    err.response.data !== undefined &&
    err.response.data !== null &&
    typeof err.response.data === 'object' &&
    'message' in err.response.data &&
    typeof err.response.data.message === 'string'
  ) {
    message = err.response.data.message;
  } else if (
    err !== undefined &&
    err !== null &&
    typeof err === 'string'
  ) {
    message = err;
  }
  showToast('error', message);
  log(err);
};
