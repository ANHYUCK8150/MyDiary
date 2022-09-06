/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setTitle, setAllFalse, setBackX } from '../../../app/headerSlice';
import BookApi from '../../../util/BookApi';
import style from './BookUploadPage.style';

const BookUploadPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const bookInfo = location.state ? location.state.data : '';

  //변수
  const { author, description, imageUrl, isbn, price, publisher, title } = bookInfo;
  const [page, setPage] = useState(0);
  const [endPage, setEndPage] = useState(0);

  //API
  const { setBook } = BookApi;

  //EVENT
  const saveBookInfo = () => {
    const bookInfo = {
      title: title,
      author: author,
      description: description,
      imageUrl: imageUrl,
      isbn: isbn,
      price: price,
      publisher: publisher,
      page: page ? page : 0,
      endPage: endPage ? endPage : 0,
    };

    const bookId = setBook(bookInfo);
    navigate('/book');
  };

  //Header
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBackX(true));
    dispatch(setTitle('도서 등록'));
    return () => {};
  }, [dispatch]);

  //Styled
  const { UploadBox, ContentsBox, SaveButton, ImgBox, PageBox } = style;
  return (
    <UploadBox>
      <ImgBox>
        <img src={imageUrl} alt="" />
      </ImgBox>
      <ContentsBox>
        <input value={title} disabled />
        <input placeholder="저자명" value={author} disabled />
        <input placeholder="출판사" value={publisher} disabled />
        <PageBox>
          <input type="number" onChange={e => setPage(e.target.value)} placeholder="읽은 페이지" min="0" max="99999" />
          <input type="number" onChange={e => setEndPage(e.target.value)} placeholder="마지막 페이지" min="0" max="99999" />
        </PageBox>
        <textarea placeholder="" value={description} disabled />
      </ContentsBox>
      <SaveButton onClick={() => saveBookInfo()}>완료</SaveButton>
    </UploadBox>
  );
};

export default BookUploadPage;
