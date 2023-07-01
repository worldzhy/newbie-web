import React, { type ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Container, Grid } from '@mui/material';
import styles from './index.module.scss';
import ButtonCustom from '@/components/ButtonCustom';
import InputTextCustom from '@/components/InputTextCustom';
import LinkCustom from '@/components/LinkCustom';
import Auth from '@/shared/libs/auth';
import { delayExecute, sendRequest } from '@/shared/libs/mixins';
import Pre from '@/widgets/shared/Pre';

const Page = (): ReactElement => {
  /**
   * Declarations
   */
  const auth = new Auth();
  const router = useRouter();

  /**
   * States
   */
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handlers
   */
  const loginHandler = async (): Promise<void> => {
    await sendRequest(setIsLoading, async () => {
      const data = {
        account: email,
        password,
      };
      await auth.login(data);
      delayExecute(() => {
        void router.push('/projects');
      });
    });
  };

  return (
    <>
      <Pre title="Login" isLoading={isLoading} />
      <main className={`${styles.main}`}>
        <Container>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <Typography className={`${styles.title}`} variant="h1">
                InceptionPad Backyard
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form className={`${styles.form}`}>
                <Grid container rowSpacing={4}>
                  <Grid item xs={12}>
                    <InputTextCustom
                      label="Email"
                      variant="outlined"
                      value={email}
                      type="email"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} className={`${styles.password}`}>
                    <InputTextCustom
                      label="Password"
                      variant="outlined"
                      value={password}
                      type="password"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <LinkCustom
                      href="/forgot-password"
                      className={`${styles.forgotPassword}`}
                    >
                      Forgot Password
                    </LinkCustom>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonCustom
                      customColor="dark"
                      onClick={() => {
                        void loginHandler();
                      }}
                    >
                      Login
                    </ButtonCustom>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Page;
