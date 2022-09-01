/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTitle, setAllFalse } from '../../app/headerSlice';
import style from './ChatPage.style';
import RoomItem from './RoomItem';
import ChatApi from '../../util/ChatApi';
import socket from '../../util/ChatSocket';

const ChatPage = () => {
  const dispatch = useDispatch();
  const client = useRef({});

  //변수
  const memberId = useSelector(state => state.AHuser.id);
  const [roomList, setRoomList] = useState();

  //api
  const { getRoomList } = ChatApi;
  const { connect, disconnect } = socket;

  //socket params
  const socket_params = {
    client: client,
    option: 'room',
    roomId: '',
    member: '',
    setChatMessages: setRoomList,
    event: getRoomList,
    fireNotification: '',
  };

  //Header
  useEffect(() => {
    connect(socket_params);
    dispatch(setAllFalse());
    dispatch(setTitle('대화'));
    getRoomList().then(result => {
      setRoomList(result);
    });

    return () => {
      disconnect(client);
    };
  }, [dispatch, connect, disconnect, getRoomList]);

  const { ChatBox, RoomListBox, NoItem } = style;

  return (
    <ChatBox>
      {roomList ? (
        <RoomListBox>
          {roomList.map((room, index) => {
            return <RoomItem key={index} room={room} memberId={memberId} />;
          })}
        </RoomListBox>
      ) : (
        <NoItem>대화내용이 없습니다.</NoItem>
      )}
    </ChatBox>
  );
};

export default ChatPage;
