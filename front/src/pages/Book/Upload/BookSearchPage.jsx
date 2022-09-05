/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBack, setAllFalse, setPlaceholder, setSearchBox } from '../../../app/headerSlice';
import bookApi from '../../../util/BookApi';
import style from './BookUploadPage.style';
import Loader from '../../../components/common/Loader';
import BookSearchItem from './BookSearchItem';

const BookSearchPage = () => {
  const dispatch = useDispatch();

  //변수
  const [pageNum, setPageNum] = useState(1);
  const [eventListener, setEventListener] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isAction, setIsAction] = useState(false);
  const [resultList, setResultList] = useState([]);
  const [totalResultCount, setTotalResultCount] = useState(0);

  //api
  const { ApiSearch } = bookApi;

  //event
  const searchInputKeyUp = e => {
    if (e.key === 'Enter') {
      searchBtnClick();
    }
  };

  const searchBtnClick = () => {
    //페이지 초기화
    setPageNum(2);
    //스크롤 탑
    window.scrollTo(0, 0);
    //eventListner 재 실행 막기
    if (isAction) {
      return;
    }
    setIsAction(true);
    if (document.getElementById('searchInput').value === '') {
      alert('도서명을 입력하세요');
    } else {
      searchKeyword();
    }
  };

  const searchKeyword = async () => {
    setLoader(true);
    const result = await ApiSearch(pageNum, document.getElementById('searchInput').value);
    setResultList([...resultList, ...result.contents]);
    setTotalResultCount(result.totalElements.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    setLoader(false);
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      setPageNum(pageNum => pageNum + 1);
      searchKeyword();
    }
  };

  //Header
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setSearchBox(true));
    dispatch(setBack(true));
    dispatch(setPlaceholder('검색할 도서를 입력해주세요.'));
    setEventListener(true);
    return () => {};
  }, [dispatch]);

  //header search input
  useEffect(() => {
    if (eventListener) {
      document.getElementById('searchInput').addEventListener('keyup', searchInputKeyUp);
      document.getElementById('searchBtn').addEventListener('click', searchBtnClick);
    }
    return () => {
      document.getElementById('searchInput').removeEventListener('keyup', searchInputKeyUp);
      document.getElementById('searchBtn').removeEventListener('click', searchBtnClick);
    };
  }, [eventListener]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  //styled
  const { SearchBox, BookList, NoResult } = style;
  return (
    <SearchBox>
      <span>검색결과 ({totalResultCount})</span>
      <BookList>{resultList.length <= 0 ? <NoResult>찾고 싶은 책을 검색해보세요.</NoResult> : resultList.map((item, index) => <BookSearchItem item={item} key={index} />)}</BookList>
      {loader && <Loader />}
    </SearchBox>
  );
};

export default BookSearchPage;
