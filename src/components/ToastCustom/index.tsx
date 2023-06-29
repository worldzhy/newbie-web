import { type ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import styles from './index.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const Toast = (): ReactElement => {
  return (
    <ToastContainer
      className={styles.toast}
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};

export default Toast;
