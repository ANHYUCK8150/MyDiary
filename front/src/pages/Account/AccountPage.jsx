/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setSettings, setBack, setAllFalse, setTitle } from '../../app/headerSlice';
import style from './AccountPage.style';
import noImg from '../../assets/img/logo/no_img.png';
import MemoItem from './MemoItem';
import BookItem from './BookItem';

const AccountPage = () => {
  const location = useLocation();
  const memberInfo = location.state ? location.state.data : '';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //--------------header START--------------
  const user = useSelector(state => state.AHuser);

  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setTitle(memberInfo ? `${memberInfo.name}님의 정보` : '내정보'));
    dispatch(setSettings(memberInfo ? false : true));
    dispatch(setBack(memberInfo ? true : false));
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
      tabCont: <MemoItem memberId={memberInfo ? memberInfo.id : user.id}></MemoItem>,
    },
    {
      tabTitle: (
        <h2 key={1} className={activeIndex === 1 ? 'on' : ''} onClick={() => tabClickHandler(1)}>
          독서
        </h2>
      ),
      tabCont: <BookItem memberId={memberInfo ? memberInfo.id : user.id}></BookItem>,
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
          <img onError={onErrorImg} src={memberInfo ? (memberInfo.imageUrl === null ? '' : memberInfo.imageUrl) : user.imageUrl === null ? '' : user.imageUrl} alt="이미지" />
        </Top>
        <h2>{memberInfo ? memberInfo.name : user.name}</h2>
        <h6>{memberInfo ? memberInfo.introduction : user.introduction}</h6>
        {memberInfo ? '' : <button onClick={() => navigate('/account/profile')}>프로필 편집</button>}
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
