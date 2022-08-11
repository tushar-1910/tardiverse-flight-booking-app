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

function Signup() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const toast = useToast();
  const navigate = useNavigate();

  let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
  let user = {
    name,
    email,
    password,
  };
  const handlesubmit = () => {
    name === '' || email === '' || password === ''
        ? toast({
            title: 'Please fill all fields',
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top',
            })
        : allUsers.find(element => {
            return (element.email === email);
            })
            ? toast({
                title: 'Email already exists',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top',
                })
            : setUsers();
    };

  const setUsers = () => {
    toast({
      position: 'top',
      title: 'Account created',
      description: 'Please login',
      status: 'success',
      variant: 'subtle',
      duration: 2000,
      isClosable: true,
    });
    allUsers.push(user);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    setName('');
    setEmail('');
    setPassword('');
    navigate('/login');
  };

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
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter Name"
      />
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
          Already have an account?
          <Link to="/login" style={{ color: 'red', marginLeft: '5px' }}>
            Login
          </Link>
        </p>
        <Button
          onClick={() => {
            handlesubmit();
          }}
          variantColor="blue"
          variant="outline"
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
}

export default Signup;
