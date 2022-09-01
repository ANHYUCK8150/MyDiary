import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { useSelector } from 'react-redux';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/layout/Layout';
import usePushNotification from './components/common/usePushNotification';
import socket from './util/ChatSocket';

const App = () => {
  const { fireNotification } = usePushNotification();
  const client = useRef({});
  const { connect, disconnect } = socket;
  const user = useSelector(state => state.AHuser);

  //Header
  useEffect(() => {
    connect(client, 'all', '', user, '', '', fireNotification);
    return () => {
      disconnect(client);
    };
  }, [connect, disconnect, user, fireNotification]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout />
      {/* <React.StrictMode></React.StrictMode> */}
    </ThemeProvider>
  );
};

export default App;
