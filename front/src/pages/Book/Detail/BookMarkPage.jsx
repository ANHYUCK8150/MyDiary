/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import noImg from '../../../assets/img/logo/postb_default.svg';
import style from './BookDetailPage.style';
import BookApi from '../../../util/BookApi';

const BookMarkPage = () => {
  const location = useLocation();
  const book = location.state.data;
  const id = location.state.id;
  const navigate = useNavigate();

  //API
  const { setBookMark } = BookApi;

  const reviewId = book.bookReview !== null ? book.bookReview.id : null;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(book.bookReview !== null ? book.bookReview.content : '');
  const [textCount, setTextCount] = useState(book.bookReview !== null ? book.bookReview.content.length : 0);

  //EVENT
  const onChangeContent = e => {
    if (e.target.value.length <= 1000) {
      setContent(e.target.value);
      setTextCount(e.target.value.length);
    }
  };

  const saveReview = () => {
    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!content) {
      alert('리뷰 내용을 작성해주세요');
      return;
    }

    const params = {
      bookId: book.id,
      title: title,
      content: content,
      id: null,
    };

    setBookMark(params)
      .then(result => {
        navigate(`/book/detail`, { state: { id: book.id }, replace: true });
      })
      .catch(error => {
        alert(error);
      });
  };

  const { BookWrap, BookInfo, TitleBox, BookImageBox, ReviewBox, SaveButton } = style;
  return (
    <BookWrap>
      <BookInfo>
        <TitleBox>
          <h6>
            {book.bookInfo.author} / {book.bookInfo.publisher}
          </h6>
        </TitleBox>
        <BookImageBox>
          <img src={book.bookInfo === null ? noImg : book.bookInfo.imageUrl} alt="" />
        </BookImageBox>
      </BookInfo>
      <ReviewBox>
        <input placeholder="제목" value={title} onChange={e => setTitle(e.target.value)} maxLength="22" />
        <textarea placeholder="내용 작성" value={content} onChange={onChangeContent} />
        <span>{textCount}/1000</span>
      </ReviewBox>
      <SaveButton onClick={() => saveReview()}>완료</SaveButton>
    </BookWrap>
  );
};

export default BookMarkPage;
