import styles from './LinkCustom.module.css';
import React, { type FC, type HTMLProps } from 'react';
import Link from 'next/link';

interface Props {
  className?: string;
}

const LinkCustom: FC<Props & HTMLProps<HTMLAnchorElement>> = ({
  className,
  href,
  children,
}) => {
  return (
    <Link
      className={`${className === undefined ? '' : className} ${styles.link}`}
      href={href === undefined ? '' : href}
    >
      {children}
    </Link>
  );
};

export default LinkCustom;
