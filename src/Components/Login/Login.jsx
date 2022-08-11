import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/user';

function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const toast = useToast();
  const { setBooker } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    let check = allUsers.find(element => {
      return (element.email === email && element.password === password);
    });
    check ? setUser() : error();
  };

  const setUser = () => {
    toast({
      position: 'top',
      title: 'User logged in',
      status: 'success',
      variant: 'subtle',
      duration: 2000,
      isClosable: true,
    });
    localStorage.setItem('user', JSON.stringify({ email, password }));
    setBooker({ email, password });
    navigate('/');
    return;
  };

  const error = () =>
    toast({
      title: 'Invalid email or Password',
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });

  return (
    <Box
      w={500}
      borderWidth="1px"
      borderRadius="lg"
      padding={10}
      alignItems="center"
      margin="3rem auto"
      display="flex"
      flexDirection="column"
      gap="20px"
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
    >
      <Input
        variant="outline"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        placeholder="Enter Email"
      />
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Box display="flex" gap={20} justifyContent="space-between">
        <p>
          Create an account?
          <Link to="/signup" style={{ color: 'red', marginLeft: '5px' }}>
            Signup
          </Link>
        </p>
        <Button
          variantColor="blue"
          onClick={() => {
            handleLogin();
          }}
          variant="outline"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
