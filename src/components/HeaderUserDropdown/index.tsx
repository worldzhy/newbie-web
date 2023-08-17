import {useState} from 'react';
import {IconButton, Menu, MenuItem} from '@mui/material';
import {AccountCircle, Login} from '@mui/icons-material';

const mockAuthStatus = true;

const HeaderUserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogin = () => {
    // TODO: handle login
    console.log('-----> handle login');
  };

  const authRender = (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
      </Menu>
    </div>
  );
  const guestRender = (
    <>
      <IconButton size="large" onClick={handleLogin} color="inherit">
        <Login />
      </IconButton>
    </>
  );

  return <>{mockAuthStatus ? authRender : guestRender}</>;
};

export default HeaderUserDropdown;
