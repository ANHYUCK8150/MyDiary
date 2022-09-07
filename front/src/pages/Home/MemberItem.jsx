/* eslint-disable max-lines-per-function */
/* eslint-disable array-callback-return */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './HomePage.style';
import noImg from '../../assets/img/logo/no_img.png';
import chatApi from '../../util/ChatApi';

const MemberItem = ({ member, lender }) => {
  const navigate = useNavigate();

  //api
  const { setRoom } = chatApi;

  //event
  const onErrorImg = e => {
    e.target.src = noImg;
  };

  const onClickChat = (memberId, lenderId) => {
    if (!lenderId) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    } else {
      setRoom(memberId).then(result => {
        navigate('/chat/room', { state: { id: result.id, name: result.another.member.name, members: result.members } });
      });
    }
  };

  const onClickProfile = (member, lender, e) => {
    if (e.target.localName !== 'span') {
      if (!lender) {
        navigate('/account');
      } else {
        navigate('/account', { state: { data: member } });
      }
    }
  };

  const imageUrl = member.imageUrl === null ? '' : member.imageUrl;

  const { MemberBox, TitleBox, SubBox, InfoBox } = style;
  return (
    <MemberBox onClick={e => onClickProfile(member, lender, e)}>
      <img src={imageUrl} onError={onErrorImg} alt="이미지" />
      <InfoBox>
        <TitleBox>
          <p>{member.name}</p>
        </TitleBox>
        <SubBox>
          <p>{member.introduction}</p>
          <span onClick={() => onClickChat(member.id, lender.id)}>대화하기</span>
        </SubBox>
      </InfoBox>
    </MemberBox>
  );
};

export default MemberItem;
