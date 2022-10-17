/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setClear } from '../../app/userSlice';
import SignApi from '../../util/SignApi';

const LoginCheckRouter = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authCheck = async () => {
    try {
      const returnVal = await SignApi.getCurrentUser();
      if (returnVal) {
        setAuthenticated(true);
      } else {
        alert('로그인이 필요한 서비스입니다.\n *로그인 페이지로 이동합니다.');
        dispatch(setClear());
        navigate('/login');
      }
    } catch (error) {
      alert('로그인이 필요한 서비스입니다.\n *로그인 페이지로 이동합니다.');
      dispatch(setClear());
      navigate('/login');
    }
  };

  useEffect(() => {
    authCheck();
  }, [dispatch]);

  return <Outlet />;
};

export default LoginCheckRouter;
