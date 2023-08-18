import {FC, useMemo, useState} from 'react';
import {
  Box,
  List,
  Drawer,
  Toolbar,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import Logo from '../Logo';
import {useRouter} from 'next/router';
import {EMPTY_PLACEHOLDER} from '@/constants';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import styles from './index.module.scss';

type IProps = {
  headerHeight?: number;
  drawerWidth?: number;
};

const DrawerWidth = 240;
const subMenus = ['Projects', 'Services', 'Wiki', 'Team', 'Workflow'];

const NavBar: FC<IProps> = ({headerHeight, drawerWidth = DrawerWidth}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const active = useMemo(
    () =>
      subMenus.find(
        text =>
          router.pathname.includes(text.toLowerCase()) ?? EMPTY_PLACEHOLDER
      ),
    [router.pathname]
  );

  const drawer = (
    <div className={styles.menu}>
      <Toolbar style={{height: headerHeight}}>
        <Logo />
      </Toolbar>
      <List>
        {subMenus.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            style={{
              backgroundColor: text === active ? 'rgba(0, 0, 0, 0.08)' : '',
            }}
          >
            <ListItemButton href={`/${text.toLowerCase()}`}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(!mobileOpen)}
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
  );
};

export default NavBar;
