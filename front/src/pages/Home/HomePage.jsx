import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTitle, setAllFalse } from '../../app/headerSlice';
import MemberItem from './MemberItem';
import style from './HomePage.style';
import SignApi from '../../util/SignApi';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const member = useSelector(state => state.AHuser);

  //변수
  const [memberList, setMemberList] = useState([]);

  //api
  const { getMembers } = SignApi;

  //Header
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setTitle('홈'));
    getMembers().then(result => {
      setMemberList(result);
    });
    return () => {};
  }, [dispatch, getMembers]);

  //styled
  const { HomeBox, MyProfile, UserProfile, LoginButton } = style;

  return (
    <HomeBox>
      <MyProfile>
        <h2>나의 프로필</h2>
        {member.id ? <MemberItem member={member} /> : <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>}
      </MyProfile>
      <UserProfile>
        <h2>회원 목록</h2>
        {memberList.length > 0 ? memberList.filter(item => item.id !== member.id).map(item => <MemberItem key={item.id} member={item} lenderId={member.id} />) : ''}
      </UserProfile>
    </HomeBox>
  );
};

export default HomePage;
