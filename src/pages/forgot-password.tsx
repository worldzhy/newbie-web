import React, { type ReactElement } from 'react';
import { Typography, Container, Grid } from '@mui/material';
import styles from '@/styles/ForgotPassword.module.css';
import InputText from '@/components/InputText/InputText';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import Pre from '@/widgets/Pre';

const Home = (): ReactElement => {
  return (
    <>
      <Pre title='Forgot Passwprd'/>
      <main className={`${styles.main}`}>
        <Container>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <Typography className={`${styles.text}`}>If an account exists for Email@inceptionpad.com, you will get an email with instructions on resetting your password. If it doesn&apos;t arrive, be sure to check your spam folder.</Typography>
            </Grid>
            <Grid item xs={12}>
              <form className={`${styles.form}`}>
                <Grid container rowSpacing={4}>
                  <Grid item xs={12} className={`${styles.email}`}>
                    <InputText id="outlined-basic" label="Email" variant="outlined" />
                    <LinkCustom href='/' className={`${styles.returnLogin}`}>Return to login</LinkCustom>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonCustom color='dark'>Reset Password</ButtonCustom>
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
