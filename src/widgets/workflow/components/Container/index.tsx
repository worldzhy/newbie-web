import {FC, ReactNode} from 'react';
import styles from './index.module.scss';

export type IProps = {
  children?: ReactNode;
};

const Container: FC<IProps> = ({children}) => <div className={styles.container}>{children}</div>;

export default Container;
