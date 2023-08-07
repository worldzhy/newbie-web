import {FC} from 'react';
import styles from './index.module.scss';

export type IProps = {
  value: string;
};

const Title: FC<IProps> = ({value}) => (
  <h2 className={styles.title}>{value}</h2>
);

export default Title;
