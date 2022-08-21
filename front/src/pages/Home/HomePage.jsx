import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTitle, setAllFalse } from '../../app/headerSlice';
import style from './HomePage.style';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Header
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setTitle('홈'));
    return () => {};
  }, [dispatch]);

  return <div>HomePage</div>;
};

export default HomePage;
