import React from 'react';
import {
  Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import '../../font.css';

const drawerWidth = 240;

const Sidebar = ({ setCurrentView }) => {
  const Logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#122744',
          color: 'white',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem>
          <Typography
            variant="h6"
            noWrap
            className='qwert'
            component="div"
            sx={{
              color: 'white',
              display: 'flex',
              width: '100%',
            }}
          >
            <span>future</span>
            <span style={{ color: '#4DABF7' }}>konnect</span>
          </Typography>
        </ListItem>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
        <ListItem button onClick={() => setCurrentView("dashboard")}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => setCurrentView("auditTrail")}>
          <ListItemIcon>
            <AssignmentIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Audit Trail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={Logout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;