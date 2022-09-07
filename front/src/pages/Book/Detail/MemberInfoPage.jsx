import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import noImg from '../../../assets/img/logo/postp_default.svg';
import style from './BookDetailPage.style';

const MemberInfoPage = ({ member, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onErrorImg = e => {
    e.target.src = noImg;
  };

  const onClickProfile = () => {
    if (member.id === user.id) {
      navigate('/account');
    } else {
      navigate('/account', { state: { data: member } });
    }
  };

  const { MemberWrap, MemberInfo } = style;
  return (
    <MemberWrap>
      <MemberInfo onClick={() => onClickProfile()}>
        <img src={member.imageUrl} onError={onErrorImg} alt="이미지" />
        <div>
          <h2>{member.name}</h2>
          <p>{member.introduction}</p>
        </div>
      </MemberInfo>
    </MemberWrap>
  );
};

export default MemberInfoPage;
