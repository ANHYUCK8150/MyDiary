/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './Header.style';
import keyboardArrowLeft from '../../assets/img/arrows/Keyboard_arrow_left.svg';
import settingsImg from '../../assets/img/userInterFace/Settings.svg';
import clearGray from '../../assets/img/userInterFace/Clear_gray.svg';
import searchImg from '../../assets/img/userInterFace/Search.svg';

const Header = () => {
  const url = useLocation();
  const { pathname } = url;
  const navigate = useNavigate();
  const header = useSelector(state => state.header);
  const { title, back, backHome, settings, searchBox, placeholder } = header;
  const { HeaderWrap, HeaderBox, LeftBox, Title, BackBtn, DownBtn, RightBox, RightBtn, SearchBox } = style;

  const [visible, setVisible] = useState(false);
  const handleChangeInputText = e => {
    if (e.target.value) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const handleClickClearBtn = () => {
    document.getElementById('searchInput').value = '';
    setVisible(false);
  };

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
          {searchBox && (
            <SearchBox>
              <input type="input" id="searchInput" placeholder={placeholder} onChange={handleChangeInputText} />
              <button id="clearBtn" className={visible ? 'active' : 'hide'} onClick={handleClickClearBtn}>
                <img src={clearGray} alt={'초기화버튼'} />
              </button>
              <button id="searchBtn">
                <img src={searchImg} alt={'검색버튼'} />
              </button>
            </SearchBox>
          )}
        </LeftBox>
        <RightBox>
          {settings && (
            <RightBtn onClick={() => navigate(`/account/setting`)}>
              <img src={settingsImg} alt={'설정버튼'} />
            </RightBtn>
          )}
        </RightBox>
      </HeaderBox>
    </HeaderWrap>
  );
};

export default Header;
