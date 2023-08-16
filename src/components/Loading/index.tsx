import {FC} from 'react';
import styles from './index.module.scss';

const Loading: FC = () => (
  <div className={styles.backdrop}>
    <div className={`${styles.spinner}`}></div>
  </div>
);

export default Loading;
