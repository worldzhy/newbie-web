import styles from './index.module.scss';
import React, {type FC, type HTMLProps} from 'react';
import Link from 'next/link';

interface Props {
  className?: string;
  openNewTab?: boolean;
}

const LinkCustom: FC<Props & HTMLProps<HTMLAnchorElement>> = ({
  className,
  href,
  children,
  openNewTab,
}) => {
  return (
    <Link
      className={`${className === undefined ? '' : className} ${styles.link}`}
      href={href === undefined ? '' : href}
      target={openNewTab === true ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
};

export default LinkCustom;
