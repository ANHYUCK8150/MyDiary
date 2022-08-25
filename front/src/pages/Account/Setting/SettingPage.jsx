/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBack, setAllFalse, setTitle } from '../../../app/headerSlice';
import { setClear } from '../../../app/userSlice';
import { ACCESS_TOKEN } from '../../../util/ApiUtil';
import style from './SettingPage.style';

const SettingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setTitle('설정'));
    return () => {};
  }, [dispatch]);

  const openModal = kind => {
    if (kind === 'logout') {
      dispatch(setClear());
      localStorage.removeItem(ACCESS_TOKEN);
      window.location.replace('/');
    }
  };

  const { SettingBox, VersionBox } = style;
  return (
    <SettingBox>
      <h2>계정 설정</h2>
      <ul>
        <li onClick={() => openModal('logout')}>로그아웃</li>
      </ul>
    </SettingBox>
  );
};

export default SettingPage;
