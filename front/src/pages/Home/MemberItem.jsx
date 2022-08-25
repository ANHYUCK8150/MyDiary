/* eslint-disable array-callback-return */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './HomePage.style';
import noImg from '../../assets/img/logo/no_img.png';

const MemberItem = ({ member, lenderId }) => {
  const navigate = useNavigate();

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  const imageUrl = member.imageUrl === null ? '' : member.imageUrl;

  const { MemberBox, TitleBox, SubBox, InfoBox } = style;
  return (
    <MemberBox>
      <img src={imageUrl} onError={onErrorImg} alt="이미지" />
      <InfoBox>
        <TitleBox>
          <p>{member.name}</p>
        </TitleBox>
        <SubBox>
          <p>{member.introduction}</p>
          <span>대화하기</span>
        </SubBox>
      </InfoBox>
    </MemberBox>
  );
};

export default MemberItem;
