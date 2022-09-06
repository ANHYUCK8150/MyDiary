import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTitle, setAllFalse } from '../../app/headerSlice';
import style from './BookPage.style';
import BookIngList from './BookIngList';
import BookOnList from './BookOnList';

const BookPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //변수
  const [activeIndex, setActiveIndex] = useState(0);

  //event
  const tabClickHandler = index => {
    setActiveIndex(index);
  };
  const tabContArr = [
    {
      tabTitle: (
        <h2 key={0} className={activeIndex === 0 ? 'active' : 'hide'} onClick={() => tabClickHandler(0)}>
          독서중
        </h2>
      ),
      tabCont: <BookIngList />,
    },
    {
      tabTitle: (
        <h2 key={1} className={activeIndex === 1 ? 'active' : 'hide'} onClick={() => tabClickHandler(1)}>
          독서완료
        </h2>
      ),
      tabCont: <BookOnList />,
    },
  ];
  //Header
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setTitle('도서'));
    return () => {};
  }, [dispatch]);

  //styled
  const { BookBox, TitleBox, PlusBtn } = style;
  return (
    <BookBox>
      <TitleBox>
        {tabContArr.map(section => {
          return section.tabTitle;
        })}
      </TitleBox>
      {tabContArr[activeIndex].tabCont}
      <PlusBtn onClick={() => navigate('/book/upload/search')} />
    </BookBox>
  );
};

export default BookPage;
