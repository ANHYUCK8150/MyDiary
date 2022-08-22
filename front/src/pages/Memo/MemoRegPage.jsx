/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setTitle, setBack, setAllFalse } from '../../app/headerSlice';
import style from './MemoPage.style';
import MemoApi from '../../util/MemoApi';

const MemoRegPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const memoInfo = location.state ? location.state.data : '';
  const memberId = useSelector(state => state.user.id);

  //변수
  const [memoId, setMemoId] = useState(memoInfo ? memoInfo.id : '');
  const [subject, setSubject] = useState(memoInfo ? memoInfo.subject : '');
  const [content, setContent] = useState(memoInfo ? memoInfo.content : '');
  const [textCount, setTextCount] = useState(memoInfo ? memoInfo.content.length : 0);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState(memoInfo ? memoInfo.category.id : 1);

  //API
  const { setMemo, getCategoryList } = MemoApi;

  //EVENT
  const onChangeContent = e => {
    if (e.target.value.length <= 1000) {
      setContent(e.target.value);
      setTextCount(e.target.value.length);
    }
  };

  const onSaveHandler = () => {
    if (!subject || !content) {
      alert('제목, 내용은 필수 입력 항목이에요.');
    } else {
      setMemo({ id: memoId, subject: subject, content: content, memberId: memberId, categoryId: categoryId }).then(result => {
        navigate('/memo');
      });
    }
  };

  const changeRadio = e => {
    setCategoryId(parseInt(e.target.value));
  };

  //--------------header START--------------
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setTitle('메모 등록'));
    getCategoryList(setCategoryList);
    return () => {};
  }, [dispatch, getCategoryList]);
  //styled
  const { MemoBox, ContentsBox, SaveButton, RadioWrap, RadioBox, FormCheckLeft, FormCheckText } = style;
  return (
    <MemoBox>
      <RadioBox>
        {categoryList.length > 0
          ? categoryList.map((data, index) => (
              <RadioWrap key={index}>
                <FormCheckLeft type="radio" name="radioButton" onChange={changeRadio} value={data.id} checked={categoryId === parseInt(data.id)} />
                <FormCheckText>{data.name}</FormCheckText>
              </RadioWrap>
            ))
          : ''}
      </RadioBox>
      <ContentsBox>
        <input placeholder="제목" value={subject} onChange={e => setSubject(e.target.value)} maxLength="20" />
        <textarea placeholder="내용" value={content} onChange={onChangeContent} />
        <span>{textCount}/1000</span>
        <SaveButton onClick={() => onSaveHandler()}>완료</SaveButton>
      </ContentsBox>
    </MemoBox>
  );
};

export default MemoRegPage;
