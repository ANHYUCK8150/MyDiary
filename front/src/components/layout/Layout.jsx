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
import RoomPage from '../../pages/Chat/Room/RoomPage';
import AccountPage from '../../pages/Account/AccountPage';
import ProfilePage from '../../pages/Account/Profile/ProfilePage';
import MemoPage from '../../pages/Memo/MemoPage';
import MemoRegPage from '../../pages/Memo/MemoRegPage';
import SettingPage from '../../pages/Account/Setting/SettingPage';
import BookPage from '../../pages/Book/BookPage';
import BookSearchPage from '../../pages/Book/Upload/BookSearchPage';
import BookUploadPage from '../../pages/Book/Upload/BookUploadPage';
import BookDetailPage from '../../pages/Book/Detail/BookDetailPage';
import BookReviewPage from '../../pages/Book/Detail/BookReviewPage';

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
          <Route path="/memo" element={<MemoPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/book/detail" element={<BookDetailPage />} />
          <Route element={<LoginCheckRouter />}>
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/chat/room" element={<RoomPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/profile" element={<ProfilePage />} />
            <Route path="/account/setting" element={<SettingPage />} />
            <Route path="/memo/created" element={<MemoRegPage />} />
            <Route path="/book/upload/search" element={<BookSearchPage />} />
            <Route path="/book/upload" element={<BookUploadPage />} />
            <Route path="/book/review" element={<BookReviewPage />} />
          </Route>
        </Routes>
      </Section>
      <Footer />
    </LayoutBox>
  );
};

export default Layout;
