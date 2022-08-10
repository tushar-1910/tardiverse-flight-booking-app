import {
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

function Offers({setOffer}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} marginLeft={"2"} size="lg">
        OFFERS
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>OFFERS</DrawerHeader>

          <DrawerBody
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <Box bg="#eee" w="100%" color="black" cursor={"pointer"} onClick={()=>{setOffer('NEW10');onClose()}}>
              <h2
                style={{
                  background: 'black',
                  width: '100%',
                  fontSize: '20px',
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                New User
              </h2>
              <Box display={'flex'} justifyContent="space-between" m={4}>
                <h4>Get 10% off</h4>
                <Badge variant="outline">NEW10</Badge>
              </Box>
            </Box>
            <Box bg="#eee" w="100%" color="black" cursor={"pointer"} onClick={()=>{setOffer('UPGR100');onClose()}}>
              <h2
                style={{
                  background: 'black',
                  width: '100%',
                  fontSize: '20px',
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                One Time Upgradation
              </h2>
              <Box display={'flex'} justifyContent="space-between" m={4}>
                <h4>upgrade your class</h4>
                <Badge variant="outline">UPGR100</Badge>
              </Box>
            </Box>
            <Box bg="#eee" w="100%" color="black" cursor={"pointer"} onClick={()=>{setOffer('FREEDRNK');onClose()}}>
              <h2
                style={{
                  background: 'black',
                  width: '100%',
                  fontSize: '20px',
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                Free Drink
              </h2>
              <Box display={'flex'} justifyContent="space-between" m={4}>
                <h4>Get a free drink</h4>
                <Badge variant="outline">FREEDRNK</Badge>
              </Box>
            </Box>
            <Box bg="#eee" w="100%" color="black" cursor={"pointer"} onClick={()=>{setOffer('FREESNCK');onClose()}}>
              <h2
                style={{
                  background: 'black',
                  width: '100%',
                  fontSize: '20px',
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                Free Snack
              </h2>
              <Box display={'flex'} justifyContent="space-between" m={4}>
                <h4>Get a free snack</h4>
                <Badge variant="outline">FREESNCK</Badge>
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Offers;
