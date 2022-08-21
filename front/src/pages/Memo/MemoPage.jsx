import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTitle, setAllFalse } from '../../app/headerSlice';
import style from './MemoPage.style';

const MemoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //변수
  const [memoList, setMemoList] = useState([]);
  //API

  //EVENT
  const handleAccordionMemo = e => {
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      e.target.nextElementSibling.classList.remove('active');
    } else {
      e.target.classList.add('active');
      e.target.nextElementSibling.classList.add('active');
    }
  };

  //--------------header START--------------
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setTitle('메모'));
    return () => {};
  }, [dispatch]);
  //styled
  const { MemoBox, PlusBtn, MemoWrap } = style;
  return (
    <MemoBox>
      <MemoWrap>
        <ul>
          <li onClick={handleAccordionMemo}>메모 제목</li>
          <li>메모 내용</li>

          <li onClick={handleAccordionMemo}>메모 제목2 메모 제목2 메모 제목2</li>
          <li>메모 내용2</li>
        </ul>
      </MemoWrap>
      <PlusBtn onClick={() => navigate('/memo/created')} />
    </MemoBox>
  );
};

export default MemoPage;
