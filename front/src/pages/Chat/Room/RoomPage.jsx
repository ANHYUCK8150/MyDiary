/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setBack, setTitle, setAllFalse } from '../../../app/headerSlice';
import send from '../../../assets/img/userInterFace/send.png';
import add from '../../../assets/img/arrows/Add.png';
import style from './RoomPage.style';
import ChatApi from '../../../util/ChatApi';
import socket from '../../../util/ChatSocket';
import noImg from '../../../assets/img/logo/myb_default.svg';

const RoomPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const roomId = location.state.id;
  const roomName = location.state.name;
  const members = location.state.members;
  const client = useRef({});
  const { connect, publish, disconnect } = socket;

  //변수
  const [messageList, setMessageList] = useState([]);
  const memberId = useSelector(state => state.user.id);
  const [message, setMessage] = useState('');
  let date = '';

  //api
  const { getMessageList } = ChatApi;

  //event
  const onChangeMessageHandler = e => {
    if (e.target.value.length <= 100) {
      setMessage(e.target.value);
    }
  };

  const onClickMessageSend = () => {
    if (message.trim().length > 0) {
      publish(roomId, memberId, client, message, 'TEXT');
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    if (messageList) {
      document.body.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      onClickMessageSend();
    }
  };

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  useEffect(scrollToBottom, [messageList]);

  useEffect(() => {
    connect(client, roomId, memberId, setMessageList, '');
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setTitle(roomName));
    getMessageList(roomId).then(result => {
      setMessageList(result);
    });
    return () => {
      disconnect(client);
    };
  }, [dispatch, roomName, roomId, memberId, connect, disconnect, getMessageList]);

  const { ChatRoomBox, MemberBox, MemberInfo, SendBox, MessageBox, Message, DateMessage } = style;

  return (
    <ChatRoomBox>
      <MemberBox>
        {members.map((member, index) => {
          return (
            <MemberInfo key={index}>
              <img src={member.member.imageUrl ? member.member.imageUrl : ''} onError={onErrorImg} alt="이미지" />
              <p>{member.member.name}</p>
            </MemberInfo>
          );
        })}
      </MemberBox>
      <MessageBox>
        {messageList.size !== 0
          ? messageList.map((result, index) => {
              let dateMessage = '';
              const d = new Date(result.sendDate);
              const dateTime = d.toLocaleTimeString('ko-kr', { hour: '2-digit', minute: '2-digit' });
              if (result.sendDate.substring(0, 10) !== date) {
                date = result.sendDate.substring(0, 10);
                dateMessage = new Date(result.sendDate).toLocaleDateString('ko-kr', { month: 'long', day: 'numeric' });
              } else {
                dateMessage = '';
              }
              return (
                <div key={index} className="messageBox">
                  <DateMessage className={dateMessage ? '' : 'hide'}>{dateMessage}</DateMessage>
                  <Message className={result.member.member.id === memberId ? 'another' : ''}>
                    <img src={result.member.member.imageUrl ? result.member.member.imageUrl : ''} onError={onErrorImg} alt="이미지" />
                    <div>
                      <span>{result.member.member.name}</span>
                      <p>{result.message}</p>
                    </div>
                    <span>{dateTime}</span>
                  </Message>
                </div>
              );
            })
          : ''}
      </MessageBox>
      <SendBox>
        <img src={add} alt="이미지" />
        <textarea placeholder="" onChange={onChangeMessageHandler} onKeyUp={handleKeyUp} value={message} />
        <button onClick={() => onClickMessageSend()}>
          <img src={send} alt="이미지" />
        </button>
      </SendBox>
    </ChatRoomBox>
  );
};

export default RoomPage;
