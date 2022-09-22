import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import noImg from '../../../assets/img/logo/postb_default.svg';
import style from './BookDetailPage.style';
import BookApi from '../../../util/BookApi';

const BookReviewPage = () => {
  const location = useLocation();
  const book = location.state.data;
  const user = useSelector(state => state.AHuser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { BookWrap, BookInfo, TitleBox, BookImageBox } = style;
  return (
    <BookWrap>
      <BookInfo>
        <TitleBox>
          <h6>
            {book.bookInfo.author}(지은이) / {book.bookInfo.publisher}
          </h6>
        </TitleBox>
        <BookImageBox>
          <img src={book.bookInfo === null ? noImg : book.bookInfo.imageUrl} alt="" />
        </BookImageBox>
      </BookInfo>
    </BookWrap>
  );
};

export default BookReviewPage;
