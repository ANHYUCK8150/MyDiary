/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './BookPage.style';
import Loader from '../../components/common/Loader';
import BookApi from '../../util/BookApi';
import BookListItem from './BookListItem';

const BookOnList = () => {
  const dispatch = useDispatch();

  //변수
  const [bookList, setBookList] = useState([]);
  const BookListShow = bookList.map((item, index) => <BookListItem item={item} />);
  const [loader, setLoader] = useState(false);
  const [param, setParam] = useState({
    page: 1,
    status: true,
  });

  //API
  const { getBookList } = BookApi;

  //EVENT
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setLoader(true);
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      param.page++;
      getBookList(param, setBookList, setLoader);
    }
  };

  //useEffect
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    setLoader(true);
    getBookList(param, setBookList, setLoader);
    return () => {};
  }, [dispatch, param, getBookList]);

  const { BookListBox, NoItem } = style;
  return (
    <BookListBox>
      {BookListShow.length === 0 ? <NoItem>독서완료된 도서가 없습니다.</NoItem> : BookListShow}
      {loader && <Loader />}
    </BookListBox>
  );
};

export default BookOnList;
