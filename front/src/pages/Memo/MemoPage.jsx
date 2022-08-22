/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTitle, setAllFalse } from '../../app/headerSlice';
import style from './MemoPage.style';
import MemoApi from '../../util/MemoApi';

const MemoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memberId = useSelector(state => state.user.id);

  //변수
  const [memoList, setMemoList] = useState([]);
  const [param, setParam] = useState({
    pageNum: 1,
  });

  //API
  const { getMemoList } = MemoApi;

  //EVENT
  const handleAccordionMemo = e => {
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      e.target.nextElementSibling.classList.remove('active');
    } else {
      e.target.classList.add('active');
      e.target.nextElementSibling.classList.add('active');
    }
  };

  const handleClickModify = data => {
    if (memberId === data.member.id) {
      navigate('/memo/created', { state: { data: data } });
    }
  };

  const CategoryBackColor = value => {
    if (value === '서버') {
      return 'purple';
    } else if (value === 'FE') {
      return 'blue';
    } else if (value === 'BE') {
      return 'green';
    } else if (value === 'GIT') {
      return 'steelblue';
    } else {
      return 'darksalmon';
    }
  };

  //--------------header START--------------
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setTitle('메모'));
    getMemoList(param, setMemoList);
    return () => {};
  }, [dispatch, getMemoList, param]);
  //styled
  const { MemoBox, PlusBtn, MemoWrap } = style;
  return (
    <MemoBox>
      <MemoWrap>
        <ul>
          {memoList.length > 0 ? (
            memoList.map((data, index) => (
              <div key={index}>
                <li onClick={handleAccordionMemo}>
                  <span onClick={() => handleClickModify(data)} className={CategoryBackColor(data.category.name)}>
                    {data.category.name}
                  </span>
                  {data.subject}
                </li>
                <li>
                  {data.content}
                  <p>{data.member.name}</p>
                </li>
              </div>
            ))
          ) : (
            <li className="noItem">등록된 메모가 없습니다!</li>
          )}
        </ul>
      </MemoWrap>
      <PlusBtn onClick={() => navigate('/memo/created')} />
    </MemoBox>
  );
};

export default MemoPage;
