/* eslint-disable max-lines-per-function */
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import style from './Layout.style';
import HomePage from '../../pages/Home/HomePage';
import LoginPage from '../../pages/Login/LoginPage';
import SignUpPage from '../../pages/Login/SignUpPage';
import LoginCheckRouter from '../../pages/Login/LoginCheckRouter';
import ChatPage from '../../pages/Chat/ChatPage';

const Layout = () => {
  const navi = useLocation();
  const { LayoutBox, Section } = style;
  if (navi.pathname !== '/login' && navi.pathname !== '/signup') {
    localStorage.setItem('url', navi.pathname);
  }
  return (
    <LayoutBox>
      <Header />
      <Section className="marginTB">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<LoginCheckRouter />}>
            <Route path="/chat" element={<ChatPage />} />
          </Route>
        </Routes>
      </Section>
      <Footer />
    </LayoutBox>
  );
};

export default Layout;
