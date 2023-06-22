import * as React from 'react';
import { AppBar, Box, Breadcrumbs, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import styleConfig from '@/constants/styleConfig';
import styles from '@/styles/Team.module.css';

const drawerWidth = 240;

interface Props {
  window?: () => Window
}

const Layout = (props: Props): React.ReactElement => {
  /**
  * Declarations
  */
  const { window } = props;

  /**
  * States
  */
  const [mobileOpen, setMobileOpen] = React.useState(false);

  /**
  * Handlers
  */
  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={styles.menu} >
      <Toolbar className={styles.toolbar}>
        <Typography className={styles.logo} variant='h1'>Logo</Typography>
      </Toolbar>
      <Divider />
      <List >
        {['Projects', 'Services', 'Wiki', 'Team', 'My space'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ButtonCustom
                className={styles.menuButtons}
                color='light'
                href={`/${text.toLowerCase()}`}
              >
                {text}
              </ButtonCustom>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={styles.header}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar className={styles.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            className={styles.stack}
          >
            <Breadcrumbs aria-label='breadcrumb' separator={<ArrowRightIcon fontSize='medium' />}>
              <LinkCustom href='/'>
                Home
              </LinkCustom>
              <Typography color='text.primary'>
                Team
              </Typography>
            </Breadcrumbs>
            <AccountCircleIcon/>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: `2px solid ${styleConfig.color.primaryGrayColor}` }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: `2px solid ${styleConfig.color.primaryGrayColor}` }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography paragraph>
          Content
        </Typography>
        <Typography paragraph>
          Content
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
