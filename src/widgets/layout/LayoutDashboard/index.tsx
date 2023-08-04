import React, {type ReactElement, useState} from 'react';
import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import Pre from '@/widgets/shared/Pre';
import Logo from '@/widgets/shared/Logo';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './index.module.scss';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: ReactElement;
  active: 'Projects' | 'Services' | 'Wiki' | 'Team' | 'My space' | 'Workflow';
}

const LayoutDashboard = ({window, children, active}: Props): ReactElement => {
  /**
   * Declarations
   */
  const subMenus = [
    'Projects',
    'Services',
    'Wiki',
    'Team',
    'My space',
    'Workflow',
  ];

  /**
   * States
   */
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Handlers
   */
  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={styles.menu}>
      <Toolbar className={styles.toolbar}>
        <Logo />
      </Toolbar>
      <Divider />
      <List>
        {subMenus.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <Button
                className={styles.menuButtons}
                variant={text === active ? 'contained' : 'outlined'}
                href={`/${text.toLowerCase()}`}
              >
                {text}
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Pre title={active} isLoading={false} />
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={styles.header}
          sx={{
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            ml: {sm: `${drawerWidth}px`},
          }}
        >
          <Toolbar className={styles.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{mr: 2, display: {sm: 'none'}}}
            >
              <MenuIcon />
            </IconButton>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className={styles.stack}
            >
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ArrowRightIcon fontSize="medium" />}
              >
                <Link href="/">Home</Link>
                <Typography color="text.primary">{active}</Typography>
              </Breadcrumbs>
              <AccountCircleIcon />
            </Stack>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: {xs: 'block', sm: 'none'},
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: {xs: 'none', sm: 'block'},
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: {sm: `calc(100% - ${drawerWidth}px)`},
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
};

export default LayoutDashboard;
