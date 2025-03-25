import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Avatar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Box
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  PersonAdd as PersonAddIcon, 
  Assessment as AssessmentIcon,
  Logout as LogoutIcon,
  Person as ProfileIcon
} from '@mui/icons-material';

const Navbar = ({ 
  user, 
  setView, 
  onLogout 
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handle avatar click to open menu
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1 }}
        >
          Gate Pass System
        </Typography>
        
        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            color="inherit"
            onClick={() => setView("dashboard")}
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            onClick={() => setView("checkIn")}
            startIcon={<PersonAddIcon />}
          >
            Check In
          </Button>
          <Button
            color="inherit"
            onClick={() => setView("reports")}
            startIcon={<AssessmentIcon />}
          >
            Reports
          </Button>

          {/* User Avatar */}
          <Avatar
            sx={{ 
              width: 40, 
              height: 40, 
              ml: 2,
              cursor: 'pointer',
              bgcolor: 'primary.main'
            }}
            onClick={handleAvatarClick}
            alt={user?.name || "User"}
            src={user?.avatar}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
        </Box>

        {/* Avatar Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => setView('profile')}>
            <ListItemIcon>
              <ProfileIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;