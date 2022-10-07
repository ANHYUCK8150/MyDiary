/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { ImStarFull } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import noImg from '../../../assets/img/logo/postb_default.svg';
import style from './BookDetailPage.style';
import BookApi from '../../../util/BookApi';

const BookReviewPage = () => {
  const location = useLocation();
  const book = location.state.data;
  const navigate = useNavigate();

  //API
  const { setBookReview } = BookApi;

  //변수
  let clickedState = [false, false, false, false, false];
  if (book.bookReview !== null) {
    for (let i = 0; i < 5; i++) {
      clickedState[i] = i <= book.bookReview.rating - 1 ? true : false;
    }
  }

  const [clicked, setClicked] = useState(clickedState);
  const array = [0, 1, 2, 3, 4];
  const reviewId = book.bookReview !== null ? book.bookReview.id : null;
  const [content, setContent] = useState(book.bookReview !== null ? book.bookReview.content : '');
  const [textCount, setTextCount] = useState(book.bookReview !== null ? book.bookReview.content.length : 0);

  //EVENT
  const handleStarClick = index => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const onChangeContent = e => {
    if (e.target.value.length <= 1000) {
      setContent(e.target.value);
      setTextCount(e.target.value.length);
    }
  };

  const saveReview = () => {
    const rating = clicked.filter(Boolean).length;

    if (rating === 0) {
      alert('평점을 선택해주세요!');
      return;
    }

    if (!content) {
      alert('리뷰 내용을 작성해주세요');
      return;
    }

    const params = {
      bookId: book.id,
      reviewId: reviewId,
      content: content,
      rating: rating,
    };

    setBookReview(params).then(result => {
      navigate(`/book/detail`, { state: { id: result }, replace: true });
    });
  };

  const { BookWrap, BookInfo, TitleBox, BookImageBox, RatingBox, ReviewBox, SaveButton } = style;
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
      <RatingBox>
        {array.map(el => (
          <ImStarFull key={el} onClick={() => handleStarClick(el)} className={clicked[el] && 'black'} size="50" />
        ))}
      </RatingBox>
      <ReviewBox>
        <textarea placeholder="리뷰 작성" value={content} onChange={onChangeContent} />
        <span>{textCount}/1000</span>
      </ReviewBox>
      <SaveButton onClick={() => saveReview()}>완료</SaveButton>
    </BookWrap>
  );
};

export default BookReviewPage;
