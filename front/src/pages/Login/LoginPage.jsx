/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBackHome, setTitle, setAllFalse } from '../../app/headerSlice';
import { setId, setName, setImageUrl, setIntroduction } from '../../app/userSlice';
import { ACCESS_TOKEN } from '../../util/ApiUtil';
import SignApi from '../../util/SignApi';
import style from './LoginPage.style';
import loginLogo from '../../assets/img/logo/login.png';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //변수
  const [name, setInName] = useState('');
  const [password, setPassword] = useState('');

  //api
  const { login } = SignApi;

  useEffect(() => {
    //로그인 페이지 진입은 토큰의 문제가 있는 경우(만료 등)라 판단하여 토큰을 지우고 로그인하여 재 할당 받는다.
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(setAllFalse());
    dispatch(setBackHome(true));
    dispatch(setTitle('로그인'));
    return () => {};
  }, [dispatch]);

  //로그인 로직
  const onClickLoginHandler = () => {
    if (name && password) {
      login(name, password)
        .then(result => {
          dispatch(setId(result.member.id));
          dispatch(setName(result.member.name));
          dispatch(setImageUrl(result.member.imageUrl));
          dispatch(setIntroduction(result.member.introduction));
          localStorage.setItem(ACCESS_TOKEN, result.token);

          window.location.replace(localStorage.getItem('url'));
        })
        .catch(error => {
          alert('아이디 및 비밀번호를 확인해주세요.');
        });
    } else {
      alert('아이디와 비밀번호를 입력해주세요.');
    }
  };

  const { LoginBox, TitleBox, ContentBox, SignBox } = style;

  return (
    <LoginBox>
      <TitleBox>
        <img src={loginLogo} alt="" />
      </TitleBox>
      <ContentBox>
        <input type="text" placeholder="이름" value={name} onChange={e => setInName(e.target.value)} maxLength="10" />
        <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} maxLength="15" />
        <button onClick={() => onClickLoginHandler()}>로그인</button>
      </ContentBox>
      <SignBox>
        <li onClick={() => navigate('/signup', { replace: true })}>회원가입</li>
        <li onClick={() => alert('너... 납치 된거야')}>비밀번호 찾기</li>
      </SignBox>
    </LoginBox>
  );
};

export default LoginPage;
