import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"
function Navbar() {
    return (
        <Box  bg='#02122c' w='100%' p={4} color='white' style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/"><Button  variant='outline' className='nav'>Home</Button></Link>
            <Box>
                <Link to="/signup"><Button className='nav' variant='outline' marginRight={5}>Signup</Button></Link>
                <Link to="/login"><Button className='nav' variant='outline'>Login</Button></Link>
            </Box>
        </Box>
    )
}

export default Navbar