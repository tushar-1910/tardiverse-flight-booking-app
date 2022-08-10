import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);


