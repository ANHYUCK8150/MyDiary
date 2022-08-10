import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBack, setTitle, setAllFalse } from '../../app/headerSlice';
import style from './ChatPage.style';

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Header
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setTitle('대화'));
    return () => {};
  }, [dispatch]);
  return <div>ChatPage</div>;
};

export default ChatPage;
