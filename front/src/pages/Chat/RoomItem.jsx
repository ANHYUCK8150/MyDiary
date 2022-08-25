/* eslint-disable array-callback-return */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './ChatPage.style';
import noImg from '../../assets/img/logo/no_img.png';

const RoomItem = ({ room, memberId }) => {
  const navigate = useNavigate();

  const onErrorImg = e => {
    e.target.src = noImg;
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
          <span>{lastMessageDate}</span>
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
