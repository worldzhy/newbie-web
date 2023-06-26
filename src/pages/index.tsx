import React, { type ReactElement, useState } from 'react';
import { Typography, Container, Grid } from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import InputTextCustom from '@/components/InputTextCustom/InputTextCustom';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import Auth from '@/shared/libs/auth';
import { sendRequest } from '@/shared/libs/mixins';
import styles from '@/styles/Login.module.css';
import Pre from '@/widgets/Pre';

const Page = (): ReactElement => {
  /**
   * Declarations
   */
  const auth = new Auth();

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
