import React from 'react';
import style from './BookPage.style';
import { useNavigate } from 'react-router-dom';
import noImg from '../../assets/img/logo/homeb_default.svg';
import ProgressBar from 'react-bootstrap/ProgressBar';

const BookListItem = ({ item }) => {
  const navigate = useNavigate();

  //EVENT
  const onDetailBookPage = () => {
    //navigate(`/book/detail`, { state: { id: item.id } });
  };

  const { BookItem, BookTitle, BookStatus, BookInfo, BookPage, BookState } = style;

  return (
    <BookItem key={item.id} onClick={() => onDetailBookPage()}>
      <img src={item.bookInfo.imageUrl !== null ? item.bookInfo.imageUrl : noImg} alt="썸네일" />
      <BookInfo>
        <BookTitle>
          <h4>{item.name}</h4>
          <span>{item.bookInfo.author}</span>
        </BookTitle>
        <BookStatus>{item.bookReview === null ? <span className="orange">독서중</span> : <span className="blue">독서완료</span>}</BookStatus>
        <BookPage>
          <p>진행률</p>
          <ProgressBar variant="success" animated now={item.progress} label={`${item.progress}`} />
        </BookPage>
        <BookState>
          <p className="bookmark">{item.bookReview === null ? 0 : item.bookReview.rating}</p>
          <p className="loanCount">{item.member.name}</p>
        </BookState>
      </BookInfo>
    </BookItem>
  );
};

export default BookListItem;
