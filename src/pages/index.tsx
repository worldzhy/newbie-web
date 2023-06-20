import React, { type ReactElement } from 'react';
import { Typography, Container, Grid } from '@mui/material';
import styles from '@/styles/Login.module.css';
import InputText from '@/components/InputText/InputText';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import Pre from '@/widgets/Pre';

const Home = (): ReactElement => {
  return (
    <>
      <Pre title='Login'/>
      <main className={`${styles.main}`}>
        <Container>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <Typography className={`${styles.title}`} variant='h1'>InceptionPad Backyard</Typography>
            </Grid>
            <Grid item xs={12}>
              <form>
                <Grid container rowSpacing={4}>
                  <Grid item xs={12}>
                    <InputText id="outlined-basic" label="Email" variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <InputText id="outlined-basic" label="Password" variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <LinkCustom href='/forgot-password'>Forgot Password</LinkCustom>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonCustom color='dark'>Login</ButtonCustom>
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
