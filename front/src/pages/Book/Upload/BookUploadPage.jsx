import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setTitle, setAllFalse, setBackX } from '../../../app/headerSlice';
import style from './BookUploadPage.style';

const BookUploadPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const bookInfo = location.state ? location.state.data : '';

  //변수
  const { author, description, imageUrl, isbn, price, publisher, title } = bookInfo;
  const [page, setPage] = useState(0);
  //API

  //EVENT

  //Header
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBackX(true));
    dispatch(setTitle('도서 등록'));
    return () => {};
  }, [dispatch]);

  //Styled
  const { UploadBox, ContentsBox, SaveButton, ImgBox } = style;
  return (
    <UploadBox>
      <ImgBox>
        <img src={imageUrl} alt="" />
      </ImgBox>
      <ContentsBox>
        <input value={title} disabled />
        <input placeholder="저자명" value={author} disabled />
        <input placeholder="출판사" value={publisher} disabled />
        <input type="number" onChange={() => setPage(e.target.value)} placeholder="읽은 페이지" min="0" max="99999" />
        <textarea placeholder="" value={description} disabled />
      </ContentsBox>
      <SaveButton onClick={() => onSaveHandler()}>완료</SaveButton>
    </UploadBox>
  );
};

export default BookUploadPage;
