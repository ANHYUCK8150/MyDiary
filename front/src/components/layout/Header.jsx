/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './Header.style';
import keyboardArrowLeft from '../../assets/img/arrows/Keyboard_arrow_left.svg';
const Header = () => {
  const url = useLocation();
  const { pathname } = url;
  const navigate = useNavigate();
  const header = useSelector(state => state.header);
  const { title, back, backHome } = header;
  const { HeaderWrap, HeaderBox, LeftBox, Title, BackBtn, DownBtn, RightBox, RightBtn, LocationBox } = style;

  return (
    <HeaderWrap>
      <HeaderBox>
        <LeftBox>
          {back && <BackBtn onClick={() => navigate(-1)}>{pathname === '/rent/state' ? <img src={x} alt={'x'} /> : <img src={keyboardArrowLeft} alt={'뒤로가기'} />}</BackBtn>}
          {backHome && (
            <BackBtn onClick={() => navigate(`/`)}>
              <img src={keyboardArrowLeft} alt={'홈'} />
            </BackBtn>
          )}
          <Title>{title}</Title>
        </LeftBox>
        <RightBox></RightBox>
      </HeaderBox>
    </HeaderWrap>
  );
};

export default Header;
