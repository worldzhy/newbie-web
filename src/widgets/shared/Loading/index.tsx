import {type ReactElement} from 'react';
import styles from './index.module.scss';

const Loading = (): ReactElement => {
  return (
    <div className={styles.backdrop}>
      <div className={`${styles.spinner}`}></div>
    </div>
  );
};

export default Loading;
