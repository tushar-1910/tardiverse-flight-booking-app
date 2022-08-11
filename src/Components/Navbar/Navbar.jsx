import { Box, Button, useToast } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/user';
import './navbar.css';
function Navbar() {
    const { booker, setBooker } = React.useContext(UserContext);
    const toast = useToast();
    const handleLogout = () => {
        toast({
            position: 'top',
            title: 'User logged out',
            status: 'success',
            variant: 'subtle',
            duration: 2000,
            isClosable: true,
          });
      setBooker({});
      localStorage.removeItem('user');
    }
  return (
    <Box
      bg="#02122c"
      w="100%"
      p={4}
      color="white"
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Link to="/">
        <Button variant="outline" className="nav">
          Home
        </Button>
      </Link>
      {booker.email ? (
    
          <Button className="nav" onClick={()=>handleLogout()} variant="outline" marginRight={5}>
            Logout
          </Button>
    
      ) : (
        <Box>
          <Link to="/signup">
            <Button className="nav" variant="outline" marginRight={5}>
              Signup
            </Button>
          </Link>
          <Link to="/login">
            <Button className="nav" variant="outline">
              Login
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}

export default Navbar;
