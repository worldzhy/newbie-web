import React, { type ReactElement, useState } from 'react';
import { Typography, Container, Grid } from '@mui/material';
import styles from '@/styles/Login.module.css';
import InputText from '@/components/InputText/InputText';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import Pre from '@/widgets/Pre';
import Auth from '@/shared/libs/auth';
import { AxiosError } from 'axios';
import { showError } from '@/shared/libs/mixins';

const Home = (): ReactElement => {
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
  const login = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const data = {
        account: email,
        password
      };
      await auth.login(data);
      setIsLoading(false);
    } catch (err: unknown) {
      setIsLoading(false);
      showError(err);
      if (err instanceof AxiosError) {
        console.error(err.response?.data.message);
      } else {
        console.error(JSON.stringify(err, null, 4));
      }
    }
  };

  return (
    <>
      <Pre title='Login' isLoading={isLoading}/>
      <main className={`${styles.main}`}>
        <Container>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <Typography className={`${styles.title}`} variant='h1'>InceptionPad Backyard</Typography>
            </Grid>
            <Grid item xs={12}>
              <form className={`${styles.form}`}>
                <Grid container rowSpacing={4}>
                  <Grid item xs={12}>
                    <InputText
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} className={`${styles.password}`}>
                    <InputText
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <LinkCustom href='/forgot-password' className={`${styles.forgotPassword}`}>Forgot Password</LinkCustom>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonCustom
                      color='dark'
                      onClick={() => {
                        void login();
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

export default Home;
