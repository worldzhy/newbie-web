import {FC} from 'react';
import styles from './index.module.scss';

export type IProps = {
  value: string;
};

const Paragraph: FC<IProps> = ({value}) => (
  <p className={styles.paragraph}>{value}</p>
);

export default Paragraph;
