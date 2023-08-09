import React, {type ReactElement, useState} from 'react';
import {
  Typography,
  Container,
  Grid,
  Button,
  Link,
  TextField,
} from '@mui/material';
import {useRouter} from 'next/router';
import {delayExecute, sendRequest} from '@/http/mixins';
import Auth from '@/http/api/account';
import Pre from '@/widgets/shared/Pre';
import styles from './index.module.scss';

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
                    <TextField
                      label="Email"
                      variant="outlined"
                      value={email}
                      type="email"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                      }}
                      style={{width: '100%'}}
                    />
                  </Grid>
                  <Grid item xs={12} className={`${styles.password}`}>
                    <TextField
                      label="Password"
                      variant="outlined"
                      value={password}
                      type="password"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                      }}
                      style={{width: '100%'}}
                    />
                    <Link
                      href="/forgot-password"
                      className={`${styles.forgotPassword}`}
                    >
                      Forgot Password
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        loginHandler();
                      }}
                    >
                      Login
                    </Button>
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
