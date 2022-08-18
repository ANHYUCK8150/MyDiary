import * as StompJs from '@stomp/stompjs';
import * as SockJs from 'sockjs-client';

const baseUrl = process.env.REACT_APP_SERVER_API_URL;

//1. stomp.client 객체 만들기
const connect = (client, roomId, memberId, setChatMessages, event) => {
  client.current = new StompJs.Client({
    webSocketFactory: () => new SockJs(baseUrl + 'api/ws-stomp'),
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      console.log('connect: onConnect');
      if (roomId) {
        subscribe(client, roomId, memberId, setChatMessages);
      } else {
        subscribeRoom(client, setChatMessages, event);
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
const subscribe = (client, roomId, memberId, setChatMessages) => {
  client.current.subscribe(`/api/sub/chat/room/${roomId}`, ({ body }) => {
    setChatMessages(_chatMessages => [..._chatMessages, JSON.parse(body)]);
  });

  client.current.publish({
    destination: '/api/pub/room/join',
    body: JSON.stringify({
      roomId: roomId,
      memberId: memberId,
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

//4. client.publish 함수 : 메세지 보내기
const publish = (roomId, memberId, client, message, type) => {
  if (!client.current.connected) {
    return;
  }
  client.current.publish({
    destination: '/api/pub/chat/message',
    body: JSON.stringify({
      roomId: roomId,
      memberId: memberId,
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
