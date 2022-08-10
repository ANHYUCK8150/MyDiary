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
        dispatch(setClear());
        navigate('/login');
      }
    } catch (error) {
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
