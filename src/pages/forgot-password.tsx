import React, { useState, type ReactElement } from 'react';
import { Typography, Container, Grid } from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import InputTextCustom from '@/components/InputTextCustom/InputTextCustom';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import Auth from '@/shared/libs/auth';
import { sendRequest } from '@/shared/libs/mixins';
import styles from '@/styles/ForgotPassword.module.css';
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

  /**
  * Handlers
  */
  const forgotPasswordHandler = async (): Promise<void> => {
    await sendRequest(setIsLoading, async () => {
      await auth.forgotPassword(email);
    });
  };

  return (
    <>
      <Pre title='Forgot Passwprd' isLoading={isLoading}/>
      <main className={`${styles.main}`}>
        <Container>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <Typography className={`${styles.text}`}>If there is a corresponding account for the email address you fill in, you will get an email with instructions on resetting your password. If it doesn&apos;t arrive, be sure to check your spam folder.</Typography>
            </Grid>
            <Grid item xs={12}>
              <form className={`${styles.form}`}>
                <Grid container rowSpacing={4}>
                  <Grid item xs={12} className={`${styles.email}`}>
                    <InputTextCustom
                      label='Email'
                      variant='outlined'
                      value={email}
                      type='email'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <LinkCustom href='/' className={`${styles.returnLogin}`}>Return to login</LinkCustom>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonCustom
                      color='dark'
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
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Page;
