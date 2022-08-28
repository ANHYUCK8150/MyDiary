/* eslint-disable array-callback-return */
import React from 'react';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import style from './ChatPage.style';
import noImg from '../../assets/img/logo/no_img.png';
import 'moment/locale/ko';

const RoomItem = ({ room, memberId }) => {
  const navigate = useNavigate();

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  const displayCreatedAt = createdAt => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    console.log(parseInt(startTime - nowTime));
    if (parseInt(startTime - nowTime) > -60000) {
      return <Moment format="방금 전">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) < -86400000) {
      return <Moment format="YYYY년 MM월 DD일">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment fromNow>{startTime}</Moment>;
    }
  };

  const lastMessageDate = new Date(room.modifiedDate).toLocaleTimeString('ko-kr', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const imageUrl = room.id === 1 ? '' : room.another.member.imageUrl === null ? '' : room.another.member.imageUrl;
  const notReadArr = room.members.filter(member => member.member.id === memberId);
  const notRead = notReadArr.length > 0 ? notReadArr[0].notReadMessage : 0;
  const roomName = room.id === 1 ? '전체 대화방' : room.another.member.name;
  const { RoomBox, TitleBox, SubBox, InfoBox } = style;
  return (
    <RoomBox onClick={() => navigate('/chat/room', { state: { id: room.id, name: roomName, members: room.members } })}>
      <img src={imageUrl} onError={onErrorImg} alt="이미지" />
      <InfoBox>
        <TitleBox>
          <p>{roomName}</p>
          {/* <span>{lastMessageDate}</span> */}
          <span>{displayCreatedAt(room.modifiedDate)}</span>
        </TitleBox>
        <SubBox>
          <p>{room.lastMessage}</p>
          <span className={notRead === 0 ? 'hide' : ''}>{notRead}</span>
        </SubBox>
      </InfoBox>
    </RoomBox>
  );
};

export default RoomItem;
