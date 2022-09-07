/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAllFalse, setBack, setTitle } from '../../../app/headerSlice';
import noImg from '../../../assets/img/logo/postb_default.svg';
import style from './BookDetailPage.style';
import BookApi from '../../../util/BookApi';
import MemberInfoPage from './MemberInfoPage';

const BookDetailPage = () => {
  const location = useLocation();
  const bookId = location.state.id;
  const user = useSelector(state => state.AHuser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //변수
  const [book, setBook] = useState();
  const [page, setPage] = useState(0);
  const [endPage, setEndPage] = useState(0);

  //API
  const { getBook } = BookApi;

  //EVENT

  //--------------header START--------------
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    getBook(bookId).then(result => {
      setBook(result);
      setPage(result.page);
      setEndPage(result.endPage);
      dispatch(setTitle(result.name));
    });
    return () => {};
  }, [dispatch, getBook, bookId]);

  const { BookWrap, BookInfo, TitleBox, BookCont, BookImageBox, BookFooter, FooterBox, SettingBox, NoItem } = style;
  return (
    <BookWrap>
      {book && (
        <>
          <BookInfo>
            <TitleBox>
              <h6>
                {book.bookInfo.author}(지은이) / {book.bookInfo.publisher}
              </h6>
            </TitleBox>
            <BookImageBox>
              <img src={book.bookInfo === null ? noImg : book.bookInfo.imageUrl} alt="" />
            </BookImageBox>
            <BookCont>
              <h4>도서 설명</h4>
              <p>{book.bookInfo.description}</p>
              <h4>도서 리뷰</h4>
              {book.bookReview !== null ? <div></div> : <NoItem>등록된 리뷰가 없습니다.</NoItem>}
            </BookCont>
          </BookInfo>
          <MemberInfoPage member={book.member} user={user} />
          {book.member.id === user.id && (
            <>
              <SettingBox>
                <input type="number" onChange={e => setPage(e.target.value)} placeholder="읽은 페이지" min="0" max="99999" value={page} />
                <input type="number" onChange={e => setEndPage(e.target.value)} placeholder="마지막 페이지" min="0" max="99999" value={endPage} />
                <button>수정</button>
              </SettingBox>
              <BookFooter>
                <FooterBox>
                  <button className="blue">리뷰 작성</button>
                  <button className="red">삭제</button>
                </FooterBox>
              </BookFooter>
            </>
          )}
        </>
      )}
    </BookWrap>
  );
};

export default BookDetailPage;
