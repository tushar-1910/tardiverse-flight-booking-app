import { Box, Button, Input, Select, useToast } from '@chakra-ui/react';
import React from 'react';
import Offers from '../Offers/Offers';
import banner from './banner.png';
import { MdArrowDropDown } from 'react-icons/md';
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

  React.useEffect(() => {
    getOffer();
    getTotal();
  }, [offer, setOffer, depart, arrive, setTotal, from, to, setFrom, setTo]);

  const handleBook = () => {
    setFrom('');
    setTo('');
    setDepart('');
    setArrive('');
    setOffer('');
    setDiscount('');
    setTotal('');
  };

  const handledepart = date => {
    console.log('depart', date);
    if (!date) {
      setArrive('');
      return;
    } else {
      let departure = new Date(date);
      let today = new Date();
      if (
        ((departure.getDate() >= today.getDate() &&
          departure.getMonth() >= today.getMonth()) ||
          (departure.getDate() <= today.getDate() &&
            departure.getMonth() > today.getMonth())) &&
        departure.getFullYear() >= today.getFullYear() &&
        departure.getHours() >= today.getHours()
      ) {
        setDepart(date);
        let arrival = new Date(
          departure.setHours(
            departure.getHours() + 2,
            departure.getMinutes() + 30
          )
        );
        let hour;
        let month;
        let day;
        let minute;
        if (arrival.getHours() < 10) {
          hour = '0' + arrival.getHours();
        } else {
          hour = arrival.getHours();
        }
        if (arrival.getMinutes() < 10) {
          minute = '0' + arrival.getMinutes();
        } else {
          minute = arrival.getMinutes();
        }
        if (arrival.getMonth() < 10) {
          month = '0' + (arrival.getMonth() + 1);
        } else {
          month = arrival.getMonth() + 1;
        }
        if (arrival.getDate() < 10) {
          day = '0' + arrival.getDate();
        } else {
          day = arrival.getDate();
        }

        arrival =
          arrival.getFullYear() +
          '-' +
          month +
          '-' +
          day +
          'T' +
          hour +
          ':' +
          minute;

        setArrive(arrival);
      } else {
        setDepart('');
      }
    }
  };
  const getTotal = () => {
    let a = cities.indexOf(from);
    let b = cities.indexOf(to);
    let departure = new Date(depart);
    let today = new Date();
    let month = Math.abs(departure.getMonth() - today.getMonth());
    if (month === 0) {
      let Total = (a + b) * 1000;
      setTotal(Total);
    } else {
      let Total =
        (a + b) * 1000 - Math.round(((a + b) * 1000 * (month * 0.6)) / 100);
      setTotal(Total);
    }
  };

  const getOffer = () => {
    // console.log('called get offer' , offer)
    if (offer === 'NEW10') {
      setDiscount(Math.round((Total * 90) / 100));
    } else if (offer === 'UPGR100') {
      setDiscount('Class Upgraded');
    } else if (offer === 'FREEDRNK') {
      setDiscount('Free Drinks');
    } else if (offer === 'FREESNCK') {
      setDiscount('Free Snacks');
    }
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${banner})`,
        width: '1536px',
        height: '500px',
        margin: '2rem auto',
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
          width: '85vw',
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
            }}
            placeholder="Select Date and Time"
            size="lg"
            type="datetime-local"
            color={'white'}
          />
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Offers setOffer={setOffer} getOffer={getOffer} />
          <Input
            placeholder="Enter Coupon Code"
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
              from && to && depart && arrive
                ? toast({
                    position: 'top',
                    title: 'Ticket booked successfully',
                    description: 'Details are sent to your email',
                    status: 'success',
                    variant: "subtle",
                    duration: 3000,
                    isClosable: true,
                  })
                : toast({
                    position: 'top',
                    title: 'Please fill all the fields',
                    status: 'warning',
                    variant: "subtle",
                    duration: 3000,
                    isClosable: true,
                  });
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
