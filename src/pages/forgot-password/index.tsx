import React, { useState, type ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Typography, Container, Grid } from '@mui/material';
import styles from './index.module.scss';
import ButtonCustom from '@/components/ButtonCustom';
import InputTextCustom from '@/components/InputTextCustom';
import LinkCustom from '@/components/LinkCustom';
import Auth from '@/shared/libs/auth';
import { sendRequest, showToast } from '@/shared/libs/mixins';
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
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  /**
   * Handlers
   */
  const sendVerificationCodeHandler = async (): Promise<void> => {
    await sendRequest(setIsLoading, async () => {
      await auth.sendVerificationCode(email);
      showToast('success', 'Verification code sent to your email');
    });
  };

  const forgotPasswordHandler = async (): Promise<void> => {
    await sendRequest(setIsLoading, async () => {
      await auth.forgotPassword({ email, verificationCode, newPassword });
      showToast('success', 'Password successfully updated');
      setTimeout(() => {
        void router.push('/');
      }, 2000);
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
                      <InputTextCustom
                        label="Email"
                        variant="outlined"
                        value={email}
                        type="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <ButtonCustom
                        className={`${styles.button}`}
                        customColor="dark"
                        onClick={() => {
                          void sendVerificationCodeHandler();
                        }}
                      >
                        Send
                      </ButtonCustom>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <InputTextCustom
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
                    <InputTextCustom
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
                    <ButtonCustom
                      customColor="dark"
                      onClick={() => {
                        void forgotPasswordHandler();
                      }}
                    >
                      Reset Password
                    </ButtonCustom>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12}>
              <LinkCustom href="/">Return to login</LinkCustom>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Page;
