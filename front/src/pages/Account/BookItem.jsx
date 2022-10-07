/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './AccountPage.style';
import BookApi from '../../util/BookApi';
import Loader from '../../components/common/Loader';
import noImg from '../../assets/img/logo/homeb_default.svg';

const BookItem = ({ memberId }) => {
  const navigate = useNavigate();
  const user = useSelector(state => state.AHuser);
  //변수
  const [loader, setLoader] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [param, setParam] = useState({
    pageNum: 1,
    memberId: memberId,
  });

  //API
  const { getMemberBookList } = BookApi;

  //EVENT
  const onDetailBookPage = bookId => {
    navigate(`/book/detail`, { state: { id: bookId } });
  };

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  // infinite Scroll Event
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setLoader(true);
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      param.pageNum++;

      getMemberBookList(param, setBookList, setLoader);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    setLoader(true);
    getMemberBookList(param, setBookList, setLoader);
    return () => {};
  }, [getMemberBookList, param]);

  const { BookWrap, PlusBtn, NoItem, BookBox } = style;
  return (
    <BookWrap>
      {bookList.length > 0 ? (
        <BookBox>
          {bookList.map((item, index) => (
            <li key={index} onClick={() => onDetailBookPage(item.id)}>
              <img src={item.bookInfo.imageUrl !== null ? item.bookInfo.imageUrl : noImg} alt="썸네일" onError={onErrorImg} />
              <p>{item.bookReview === null ? '독서중' : '독서완료'}</p>
            </li>
          ))}
        </BookBox>
      ) : (
        <NoItem>등록된 도서가 없습니다</NoItem>
      )}

      <PlusBtn onClick={() => navigate('/book/upload/search')} />
      {loader && <Loader />}
    </BookWrap>
  );
};

export default BookItem;
