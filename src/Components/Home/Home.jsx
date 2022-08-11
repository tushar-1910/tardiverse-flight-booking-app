import { Box, Button, Input, Select, useToast } from '@chakra-ui/react';
import React from 'react';
import Offers from '../Offers/Offers';
import banner from './banner.png';
import { MdArrowDropDown } from 'react-icons/md';
import { UserContext } from '../../Context/user';
const cities = [
  'Punjab',
  'Chennai',
  'Delhi',
  'Mumbai',
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Gwalior',
  'Darjeeling',
];
function Home() {
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [depart, setDepart] = React.useState('');
  const [arrive, setArrive] = React.useState('');
  const [offer, setOffer] = React.useState('');
  const [Discount, setDiscount] = React.useState('');
  const [Total, setTotal] = React.useState('');
  const toast = useToast();
  const { booker } = React.useContext(UserContext);

  React.useEffect(() => {
    afterOffer();
    getTotal();
  }, [offer, setOffer, depart, arrive, setTotal, from, to, setFrom, setTo]);

  const handledepart = date => {
    date == "" ? setArrive('') : handleArrive(date);
  };

  const handleArrive = date => {
    let currentDate = new Date();
    let givenDate = new Date(date);
    switch (true) {
      case givenDate.getTime() >= currentDate.getTime() :
        setDepart(date);
        let arriveDate = new Date(givenDate.setHours(givenDate.getHours() + 7.5));
        arriveDate = arriveDate.toJSON().split("").slice(0, 16).join("");
        setArrive(arriveDate);
        break;
      default:
        setDepart('');
        break;
    }
  };
  const getTotal = () => {
    let departure = new Date(depart);
    let today = new Date();
    let month = Math.abs(departure.getMonth() - today.getMonth());
    let a = cities.indexOf(from);
    let b = cities.indexOf(to);
    month === 0
      ? setTotal((a + b) * 1100)
      : setTotal(
          (a + b) * 1100 - Math.round(((a + b) * 1100 * (month * 0.6)) / 100)
        );
  };

  const afterOffer = () => {
    offer === 'NEW10'
      ? setDiscount(Math.round((Total * 90) / 100))
      : offer === 'UPGR100'
      ? setDiscount('Class Upgraded')
      : offer === 'FREEDRNK'
      ? setDiscount('Free Drinks')
      : offer === 'FREESNCK'
      ? setDiscount('Free Snacks')
      : setDiscount('');
  };

  const handleBook = () => {
    booker.email ? confirmBooking() : errorBooking();
  };

  const errorBooking = () => {
    toast({
      title: 'Login first',
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  };

  const confirmBooking = () => {
    from && to && depart && arrive
      ? toast({
          position: 'top',
          title: 'Ticket booked successfully',
          description: 'Details are sent to your email',
          status: 'success',
          variant: 'subtle',
          duration: 2000,
          isClosable: true,
          width: 'full',
          height: 'full',
        })
      : toast({
          position: 'top',
          title: 'Please fill all the fields',
          status: 'warning',
          variant: 'subtle',
          duration: 2000,
          isClosable: true,
        });
    setFrom('');
    setTo('');
    setDepart('');
    setArrive('');
    setOffer('');
    setDiscount('');
    setTotal('');
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${banner})`,
        width: '100%',
        height: '500px',
      }}
    >
      <h1
        style={{
          textAlign: 'left',
          fontWeight: '700',
          color: 'white',
          fontSize: '3rem',
          marginTop: '2rem',
          marginLeft: '10rem',
        }}
      >
        Let the journey begin
      </h1>
      <Box
        style={{
          background: '#02122c',
          margin: '0 auto',
          borderRadius: '0.25rem',
          padding: '1.5rem',
          width: '85%',
          height: '250px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4rem',
        }}
      >
        <Box
          style={{ justifyContent: 'space-between' }}
          display={'flex'}
          gap={'5'}
        >
          <p style={{ color: 'white', marginTop: '10px' }}>From:</p>
          <Select
            value={from}
            onChange={e => {
              e.target.value === to ? setFrom('') : setFrom(e.target.value);
              setOffer('')
            }}
            icon={<MdArrowDropDown />}
            bg={'white'}
            color="balck"
            size="lg"
          >
            <option value="">Select City</option>
            {cities.map((city, index) => {
              return (
                <option key={index} value={city}>
                  {city}
                </option>
              );
            })}
          </Select>
          <p style={{ color: 'white', marginTop: '10px' }}>To:</p>
          <Select
            value={to}
            onChange={e => {
              e.target.value === from ? setTo('') : setTo(e.target.value);
              setOffer('')
            }}
            icon={<MdArrowDropDown />}
            bg={'white'}
            color="balck"
            size="lg"
          >
            <option value="">Select City</option>
            {cities.map((city, index) => {
              return (
                <option key={index} value={city}>
                  {city}
                </option>
              );
            })}
          </Select>
          <p style={{ color: 'white', marginTop: '10px' }}>Departure:</p>
          <Input
            value={depart}
            onChange={e => {
              handledepart(e.target.value);
              setOffer('')
            }}
            placeholder="Select Date and Time"
            size="lg"
            type="datetime-local"
            color={'white'}
          />
          <p style={{ color: 'white', marginTop: '10px' }}>Arrival:</p>
          <Input
            value={arrive}
            onChange={() => {
              handledepart(depart);
              setOffer('')
            }}
            placeholder="Select Date and Time"
            size="lg"
            type="datetime-local"
            color={'white'}
          />
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Offers setOffer={setOffer} afterOffer={afterOffer} />
          <Input
            placeholder="Enter Code"
            value={offer}
            width={430}
            size="lg"
            color={'white'}
            onChange={e => {
              setOffer(e.target.value);
            }}
          />
          <Box
            opacity={depart && arrive && to && from ? 100 : 0}
            size="lg"
            color={'white'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
          >
            <span>Total Amount:</span>
            {Total ? <span>{Total}</span> : null}
            <span>After Offer:</span>
            {Discount ? <span>{Discount}</span> : null}
          </Box>
          <Button
            onClick={() => {
              handleBook();
            }}
            width={250}
            size="lg"
          >
            Book Flight
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
