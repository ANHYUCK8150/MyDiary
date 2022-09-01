/* eslint-disable react-hooks/exhaustive-deps */
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

  //socket params
  const socket_params = {
    client: client,
    option: 'all',
    roomId: '',
    member: user,
    setChatMessages: '',
    event: '',
    fireNotification: fireNotification,
  };
  //Header
  useEffect(() => {
    connect(socket_params);
    return () => {
      disconnect(client);
    };
  }, [connect, disconnect, socket_params]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout />
      {/* <React.StrictMode></React.StrictMode> */}
    </ThemeProvider>
  );
};

export default App;
