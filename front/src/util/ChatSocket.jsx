/* eslint-disable react-hooks/rules-of-hooks */
import * as StompJs from '@stomp/stompjs';
import * as SockJs from 'sockjs-client';

const baseUrl = process.env.REACT_APP_SERVER_API_URL;

//1. stomp.client 객체 만들기
const connect = (client, option, roomId, member, setChatMessages, event, fireNotification) => {
  client.current = new StompJs.Client({
    webSocketFactory: () => new SockJs(baseUrl + 'api/ws-stomp'),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      if (option === 'chat') {
        subscribe(client, roomId, member, setChatMessages);
      } else if (option === 'room') {
        subscribeRoom(client, setChatMessages, event);
      } else {
        subscribeAll(client, member, fireNotification);
      }
    },
    onStompError: err => {
      console.error(err);
    },
  });
  //2. client.activate;
  client.current.activate();
};

//3. client.subscribe 함수 : 메세지 받기
const subscribe = (client, roomId, member, setChatMessages) => {
  client.current.subscribe(`/api/sub/chat/room/${roomId}`, ({ body }) => {
    setChatMessages(_chatMessages => [..._chatMessages, JSON.parse(body)]);
  });

  client.current.publish({
    destination: '/api/pub/room/join',
    body: JSON.stringify({
      roomId: roomId,
      memberId: member.id,
      message: '입장',
      type: 'TEXT',
    }),
  });
};

const subscribeRoom = (client, setChatMessages, event) => {
  client.current.subscribe(`/api/sub/chat/room`, ({ body }) => {
    event().then(result => {
      setChatMessages(result);
    });
  });
};

const subscribeAll = (client, member, fireNotification) => {
  client.current.subscribe(`/api/sub/notification`, ({ body }) => {
    const result = JSON.parse(body);
    if (member.id !== result.member.member.id) {
      fireNotification(`${result.member.member.name}`, { body: `${result.message}` });
    }
  });
};

//4. client.publish 함수 : 메세지 보내기
const publish = (roomId, member, client, message, type) => {
  if (!client.current.connected) {
    return;
  }
  client.current.publish({
    destination: '/api/pub/chat/message',
    body: JSON.stringify({
      roomId: roomId,
      memberId: member.id,
      name: member.name,
      imageUrl: member.imageUrl,
      message: message,
      type: type,
    }),
  });
};

//5. 연결 해제
const disconnect = client => {
  client.current.deactivate();
};

const chatSocketApi = { connect, publish, disconnect };

export default chatSocketApi;
