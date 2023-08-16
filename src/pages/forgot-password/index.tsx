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
import {delayExecute, sendRequest, showToast} from '@/http/mixins';

import styles from './index.module.scss';

const Page = () => {
  const auth = new Auth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const sendVerificationCodeHandler = async (): Promise<void> => {
    await sendRequest(setIsLoading, async () => {
      await auth.sendVerificationCode(email);
      showToast('success', 'Verification code sent to your email');
    });
  };

  const forgotPasswordHandler = async (): Promise<void> => {
    await sendRequest(setIsLoading, async () => {
      await auth.forgotPassword({email, verificationCode, newPassword});
      showToast('success', 'Password successfully updated');
      delayExecute(() => {
        router.push('/');
      });
    });
  };

  return (
    <>
      <Pre title="Forgot Passwprd" isLoading={isLoading} />
      <main className={`${styles.main}`}>
        <Container>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <Typography className={`${styles.text}`}>
                If there is a corresponding account for the email address you
                fill in, you will get an email with instructions on resetting
                your password. If it doesn&apos;t arrive, be sure to check your
                spam folder.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form className={`${styles.form}`}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={12} className={`${styles.email}`}>
                    <div className={`${styles.float}`}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        type="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <Button
                        className={styles.button}
                        variant="contained"
                        onClick={() => {
                          sendVerificationCodeHandler();
                        }}
                      >
                        Send
                      </Button>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Verification code"
                      variant="outlined"
                      value={verificationCode}
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setVerificationCode(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="New password"
                      variant="outlined"
                      value={newPassword}
                      type="password"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        forgotPasswordHandler();
                      }}
                    >
                      Reset Password
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Link href="/">Return to login</Link>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Page;
