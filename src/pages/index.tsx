import styles from '@/styles/Login.module.css';
import { Typography, Container, Grid } from '@mui/material';
import InputText from '@/components/InputText/InputText';
import React, { type ReactElement } from 'react';
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
                    <button>Click!</button>
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
