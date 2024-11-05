import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CartCard from './CartCard';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface AnchorTemporaryDrawerProps {
  setDrawer: React.Dispatch<React.SetStateAction<boolean>>; // Function to set the drawer state
}

export default function AnchorTemporaryDrawer({ setDrawer }: AnchorTemporaryDrawerProps) {
  const [state, setState] = React.useState({
     right: true, // Initially, the drawer opens from the right
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });

      if (!open) {
        setDrawer(false); // Close the drawer and show the profile icon
      }
    };

  const list = (anchor: Anchor) => (
    <Box
    sx={{
      width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
      backgroundColor: '#1E88E5', // Example: a shade of blue
      color: 'yellow', // Text color
      padding: 2, // Add padding for better spacing
      overflow: 'hidden', // Prevent overflow if the content is too large
      display: 'flex', // Optional: Use flexbox for better alignment
      flexDirection: 'column', // Optional: Stack content vertically
      alignItems: 'center', // Optional: Center content horizontally
    }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)} // Close the drawer when clicking the list
    onKeyDown={toggleDrawer(anchor, false)} // Close the drawer on key press
  >
    
    {/* <CartCard /> */}
  </Box>
  
  
  );

  return (
    <div style={{ width: '600%' }}>
    {(['right'] as const).map((anchor) => (
      <div style={{ width: '60px' }}>
      <React.Fragment key={anchor}>
        <Drawer
          anchor={anchor}
          // size={}
          open={state[anchor]}
          sx={{ width: '6%', // Adjust width as needed
                flexShrink: 0 }} // Prevents shrinking
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
      </div>
    ))}
  </div>
  
  )  
}
