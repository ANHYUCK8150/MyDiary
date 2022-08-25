/* eslint-disable max-lines-per-function */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './Footer.style';
import home from '../../assets/img/userInterFace/Home.svg';
import homeOff from '../../assets/img/userInterFace/Home_off.svg';
import book from '../../assets/img/userInterFace/Library_books.png';
import bookOff from '../../assets/img/userInterFace/Library_books_off.png';
import chat from '../../assets/img/userInterFace/Chat_bubble_outline.svg';
import chatOff from '../../assets/img/userInterFace/Chat_bubble_outline_off.svg';
import account from '../../assets/img/userInterFace/Account_circle.svg';
import accountOff from '../../assets/img/userInterFace/Account_circle_off.svg';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { FooterBox, IconBox } = style;

  return (
    <FooterBox className={pathname === '/login' || pathname === '/setting' || pathname === '/signup' || pathname === '/memo/created' || pathname === '/chat/room' ? 'hide' : 'show'}>
      <IconBox onClick={() => navigate(`/`)}>
        <img src={pathname !== '/' ? homeOff : home} alt="home" />홈
      </IconBox>
      <IconBox onClick={() => navigate(`/memo`)}>
        <img src={pathname !== '/memo' ? bookOff : book} alt="rent" />
        메모
      </IconBox>
      <IconBox onClick={() => navigate(`/chat`)}>
        <img src={pathname !== '/chat' ? chatOff : chat} alt="chat" />
        대화
      </IconBox>
      <IconBox onClick={() => navigate(`/account`)}>
        <img src={pathname !== '/account' ? accountOff : account} alt="account" />
        내정보
      </IconBox>
    </FooterBox>
  );
};

export default Footer;
