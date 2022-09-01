/* eslint-disable react-hooks/exhaustive-deps */
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
import noImg from '../../../assets/img/logo/no_img.png';
import Loader from '../../../components/common/Loader';
import usePushNotification from '../../../components/common/usePushNotification';

const RoomPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const roomId = location.state.id;
  const roomName = location.state.name;
  const members = location.state.members;
  const client = useRef({});
  const { connect, publish, disconnect } = socket;
  const inputRef = useRef(null);
  const { fireNotification } = usePushNotification();

  //변수
  const [loader, setLoader] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const member = useSelector(state => state.AHuser);
  const [message, setMessage] = useState('');
  let date = '';
  const [param, setParam] = useState({
    pageNum: 1,
    roomId: roomId,
  });

  //api
  const { getMessageList, sendImageMessage } = ChatApi;

  //event
  const onChangeMessageHandler = e => {
    if (e.target.value.length <= 1000) {
      setMessage(e.target.value);
    }
  };

  const onClickMessageSend = () => {
    if (message.trim().length > 0) {
      publish(roomId, member, client, message, 'TEXT');
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      if (!e.shiftKey) {
        onClickMessageSend();
      }
    }
  };

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  const saveImage = e => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      const formData = new FormData();
      formData.append('imageFile', e.target.files[0]);
      sendImageMessage(formData).then(result => {
        publish(roomId, member, client, result.url, 'IMAGE');
      });
    };
  };

  const onChangeImg = e => {
    e.preventDefault();
    inputRef.current.click();
  };

  useEffect(scrollToBottom, [messageList]);

  useEffect(() => {
    connect(client, 'chat', roomId, member, setMessageList, '', '');
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setTitle(roomName));
    getMessageList(param, setMessageList, setLoader);
    return () => {
      disconnect(client);
    };
  }, [dispatch, roomName, roomId, member, connect, disconnect, getMessageList, param]);

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
                  <Message className={result.member.member.id === member.id ? 'another' : ''}>
                    <img src={result.member.member.imageUrl ? result.member.member.imageUrl : ''} onError={onErrorImg} alt="이미지" />
                    <div>
                      <span>{result.member.member.name}</span>
                      {result.type === 'TEXT' ? <p>{result.message}</p> : <img src={result.message} onError={onErrorImg} alt="이미지" />}
                    </div>
                    <span>{dateTime}</span>
                  </Message>
                </div>
              );
            })
          : ''}
      </MessageBox>
      <SendBox>
        <input type="file" accept="image/*" ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
        <img src={add} alt="이미지" onClick={onChangeImg} />
        <textarea placeholder="" onChange={onChangeMessageHandler} onKeyUp={handleKeyUp} value={message} />
        <button onClick={() => onClickMessageSend()}>
          <img src={send} alt="이미지" />
        </button>
      </SendBox>
      {loader && <Loader />}
    </ChatRoomBox>
  );
};

export default RoomPage;
