import {APP_NAME} from '@/constants';
import {Box, Container, Typography} from '@mui/material';

const Footer = () => (
  <Container component="footer">
    <Box
      sx={{
        my: 6,
        display: {xs: 'block', sm: 'flex'},
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '24px',
        marginBottom: '24px',
      }}
    >
      <Typography color="text.tertiary" fontWeight={400}>
        Copyright © {new Date().getFullYear()} {APP_NAME}
      </Typography>
    </Box>
  </Container>
);

export default Footer;
