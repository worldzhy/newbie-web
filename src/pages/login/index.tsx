import {useState} from 'react';
import {
  Grid,
  Link,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import Pre from '@/components/Pre';
import {useRouter} from 'next/router';
import Auth from '@/http/api/account';
import {delayExecute, sendRequest} from '@/http/mixins';

import styles from './index.module.scss';

const Page = () => {
  const auth = new Auth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (): Promise<void> => {
    await sendRequest(setIsLoading, async () => {
      const data = {
        account: email,
        password,
      };
      await auth.login(data);
      delayExecute(() => {
        router.push('/projects');
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
