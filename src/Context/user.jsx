import React from 'react';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [booker, setBooker] = React.useState({});
  React.useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user')) || {};
    setBooker(user);
  }, []);
  return (
    <UserContext.Provider value={{ booker, setBooker }}>{children}</UserContext.Provider>
  );
};
