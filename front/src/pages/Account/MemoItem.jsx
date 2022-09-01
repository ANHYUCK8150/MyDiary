/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from '../Memo/MemoPage.style';
import MemoApi from '../../util/MemoApi';
import Loader from '../../components/common/Loader';

const MemoItem = ({ memberId }) => {
  const navigate = useNavigate();
  const user = useSelector(state => state.AHuser);
  //변수
  const [loader, setLoader] = useState(false);
  const [memoList, setMemoList] = useState([]);
  const [param, setParam] = useState({
    pageNum: 1,
    memberId: memberId,
  });

  //API
  const { getMyMemoList } = MemoApi;

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
    if (user.id === data.member.id) {
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

  // infinite Scroll Event
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setLoader(true);
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      param.pageNum++;

      getMyMemoList(param, setMemoList, setLoader);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    getMyMemoList(param, setMemoList, setLoader);
    return () => {};
  }, [getMyMemoList, param]);

  const { MemoWrap, PlusBtn } = style;
  return (
    <MemoWrap>
      <ul>
        {memoList.length > 0 ? (
          memoList.map((data, index) => (
            <div key={index}>
              <li onClick={handleAccordionMemo} className={user.id === data.member.id ? 'mymemo' : ''}>
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
      <PlusBtn onClick={() => navigate('/memo/created')} />
      {loader && <Loader />}
    </MemoWrap>
  );
};

export default MemoItem;
