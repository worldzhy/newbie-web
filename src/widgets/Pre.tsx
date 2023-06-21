import Head from 'next/head';
import React, { type FC, type ReactElement } from 'react';
import Loading from '@/widgets/Loading';
import Toast from '@/components/Toast/Toast';

interface Props {
  title?: string
  isLoading: boolean
}

const Pre: FC<Props> = ({ title, isLoading }): ReactElement => {
  return (
    <>
      <Toast />
      { isLoading && <Loading /> }
      <Head>
        <title>{title}</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  );
};

export default Pre;
