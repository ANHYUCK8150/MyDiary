/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSettings, setAllFalse, setTitle } from '../../app/headerSlice';
import style from './AccountPage.style';
import noImg from '../../assets/img/logo/postp_default.svg';
import MemoItem from './MemoItem';
const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //--------------header START--------------
  const user = useSelector(state => state.AHuser);
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setTitle('내정보'));
    dispatch(setSettings(true));
    return () => {};
  }, [dispatch]);

  //-------------- tab --------------
  const [activeIndex, setActiveIndex] = useState(0);
  const tabClickHandler = index => {
    setActiveIndex(index);
  };
  const tabContArr = [
    {
      tabTitle: (
        <h2 key={0} className={activeIndex === 0 ? 'on' : ''} onClick={() => tabClickHandler(0)}>
          메모
        </h2>
      ),
      tabCont: <MemoItem memberId={user.id}></MemoItem>,
    },
    {
      tabTitle: (
        <h2 key={1} className={activeIndex === 1 ? 'on' : ''} onClick={() => tabClickHandler(1)}>
          링크
        </h2>
      ),
      tabCont: '',
    },
  ];

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  //처음 스크롤 값은 0으로 false 초기 값 세팅
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    //scrollY > 130을 기준으로 state 변경
    const handleScroll = () => {
      if (!scrolled && window.scrollY > 130) {
        setScrolled(true);
      } else if (scrolled && window.scrollY <= 130) {
        setScrolled(false);
      }
    };
    //스크롤 이벤트 시 handleScroll 동작
    window.addEventListener('scroll', handleScroll);
    return () => {
      //cleanup
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const { AccountBox, UserInfo, Top, TabBox } = style;
  return (
    <AccountBox>
      <UserInfo>
        <Top>
          <img onError={onErrorImg} src={user.imageUrl} alt="이미지" />
        </Top>
        <h2>{user.name}</h2>
        <h6>{user.introduction}</h6>
        <button onClick={() => navigate('/account/profile')}>프로필 편집</button>
      </UserInfo>
      <TabBox className={scrolled ? 'active' : 'activeN'}>
        {tabContArr.map(section => {
          return section.tabTitle;
        })}
      </TabBox>
      {tabContArr[activeIndex].tabCont}
    </AccountBox>
  );
};

export default AccountPage;
