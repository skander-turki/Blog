import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {  Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;
function ProfileDashboard () {
    const navigate = useNavigate()
    return (
        <>

          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <Divider />
            <h2 style={{marginLeft : '5%', color:'#535659'}}>Settings</h2>
            <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              {['compte', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => navigate(`/profile/${text}`) }>
                    <ListItemIcon >
                      {index % 2 === 0 ? <AccountBoxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{textTransform :'capitalize'}} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box  component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
                <Outlet/>
          </Box>
        </>
      );
}
export default ProfileDashboard ;