import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField, Avatar, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import AnchorTemporaryDrawer from './Drawer';
import DrawerScrollable from './Drawer2';
import Cart from './Components/Cart';

interface HeaderProps {
  cart: Cart; // Assuming Cart is a type you've defined elsewhere
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}

const Header: React.FC<HeaderProps> = ({ cart, setCart }) => {

  const [location, setLocation] = useState<string | null>(null);
  const[drawer,setDrawer] =useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch user's location using geolocation API
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
  
          // If coordinates are correct, proceed to fetch the location
          const readableLocation = await fetchLocationFromCoordinates(latitude, longitude);
          setLocation(readableLocation);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          setLocation("Unable to retrieve location");
        }
      );
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  };
  

  // Fetch a readable location from lat/long using the Nominatim API
  const fetchLocationFromCoordinates = async (latitude: number, longitude: number) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    const data = await response.json();
    return data.display_name; // e.g., "New York, NY, USA"
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const handleSearchSubmit = () => {
    console.log("Searching for:", searchTerm);
    // Add actual search logic here
  };

  // Get user's location on component mount
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo on the left */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Typography variant="h6">
            MyApp
          </Typography>
        </Box>

        {/* Search Bar in the center */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            sx={{ marginRight: 2 }}
          />
          <IconButton onClick={handleSearchSubmit} color="inherit">
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Location & Profile on the right */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
          <IconButton onClick={getUserLocation} color="inherit">
            <LocationOnIcon />
          </IconButton>
          <Typography variant="body2" sx={{ color: 'white', marginLeft: 1 }}>
            {location ? location.length : "Loading location..."}
          </Typography>

          {drawer ? (
        <DrawerScrollable onClose={() => setDrawer(false)} cart={cart} setCart={setCart} />
      ) : (
        <IconButton color="inherit" sx={{ marginLeft: 2 }} onClick={() => setDrawer(true)}>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </IconButton>
      )}
 

        
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
