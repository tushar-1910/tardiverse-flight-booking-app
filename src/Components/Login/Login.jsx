import { Box, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  return (
    <Box w={500} borderWidth='1px' borderRadius='lg' padding={10} alignItems="center" margin="3rem auto" display="flex" flexDirection="column" gap="20px" boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px">
            <Input variant='outline' type="email" placeholder='Enter Email' />
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Box display="flex" gap={20} justifyContent="space-between">
                <p>Create an account?
                <Link to="/signup" style={{color:"red",marginLeft:"5px"}}>Signup</Link>
                </p>
                <Button variantColor='blue' variant='outline'>Login</Button>
            </Box>
        </Box>
  )
}

export default Login