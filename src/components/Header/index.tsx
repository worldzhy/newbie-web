import {FC} from 'react';
import {
  Box,
  Link,
  Stack,
  Tooltip,
  Container,
  IconButton,
  GlobalStyles,
} from '@mui/material';
import AppSearch from '../AppSearch';
import HeaderNavBar from '../HeaderNavBar';
import {styled} from '@mui/material/styles';
import {Fingerprint} from '@mui/icons-material';
import HeaderNavDropdown from '../HeaderNavDropdown';
import HeaderUserDropdown from '../HeaderUserDropdown';
import {useThemeContext} from '@/context/ThemeContext';

type IProps = {withNav?: boolean; height?: number};

const HEIGHT = 64;

const Header: FC<IProps> = ({height = HEIGHT, withNav = true}) => {
  const {
    theme: {header},
  } = useThemeContext();

  const HeaderWapper = styled('header')(({theme}) => [
    {
      position: 'fixed',
      width: '100%',
      top: 0,
      transition: theme.transitions.create('top'),
      zIndex: theme.zIndex.appBar,
      backdropFilter: 'blur(8px)',
      boxShadow: `inset 0px -1px 1px ${theme.palette.grey[100]}`,
      backgroundColor: header?.backgroundColor ?? 'rgba(255,255,255,0.8)',
    } as const,
  ]);

  return (
    <HeaderWapper>
      <GlobalStyles
        styles={{
          ':root': {
            '--MuiDocs-header-height': `${height}px`,
          },
        }}
      />
      <Container
        sx={{display: 'flex', alignItems: 'center', minHeight: HEIGHT}}
      >
        <Box
          component={Link}
          href="/"
          aria-label="Go to homepage"
          sx={{lineHeight: 0, mr: 2}}
        >
          <h1>Logo</h1>
        </Box>
        {withNav && (
          <Box sx={{display: {xs: 'none', md: 'initial'}}}>
            <HeaderNavBar />
          </Box>
        )}
        <Stack direction="row" spacing={1} style={{marginLeft: 20}}>
          <AppSearch />
          <Tooltip title="Mock buttom" enterDelay={300}>
            <IconButton
              aria-label="fingerprint"
              color="secondary"
              style={{width: 40, borderRadius: 6}}
            >
              <Fingerprint />
            </IconButton>
          </Tooltip>
          <IconButton
            aria-label="fingerprint"
            color="success"
            style={{width: 40, borderRadius: 6}}
          >
            <Fingerprint />
          </IconButton>
        </Stack>
        <Box sx={{ml: 'auto'}} />
        <Box>
          <HeaderUserDropdown />
        </Box>
        {withNav && (
          <Box sx={{display: {md: 'none'}, ml: 1}}>
            <HeaderNavDropdown />
          </Box>
        )}
        {!withNav && (
          <Box sx={{display: {sm: 'none'}, ml: 1}}>
            <HeaderNavDropdown />
          </Box>
        )}
      </Container>
    </HeaderWapper>
  );
};

export default Header;
