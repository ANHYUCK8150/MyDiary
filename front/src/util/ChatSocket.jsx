/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/rules-of-hooks */
import * as StompJs from '@stomp/stompjs';
import * as SockJs from 'sockjs-client';

const baseUrl = process.env.REACT_APP_SERVER_API_URL;

// const params = {
//   client:,
//   option:,
//   roomId:,
//   member:,
//   setChatMessages:,
//   event:,
//   fireNotification:
// };
//1. stomp.client 객체 만들기
const connect = params => {
  const client = params.client;
  client.current = new StompJs.Client({
    webSocketFactory: () => new SockJs(baseUrl + 'api/ws-stomp'),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      subscribe(params);
    },
    onStompError: err => {
      console.error(err);
    },
  });
  //2. client.activate;
  client.current.activate();
};

//3. client.subscribe 함수 : 메세지 받기
const subscribe = params => {
  if (params.option === 'chat') {
    params.client.current.subscribe(`/api/sub/chat/room/${params.roomId}`, ({ body }) => {
      params.setChatMessages(_chatMessages => [..._chatMessages, JSON.parse(body)]);
    });

    params.client.current.subscribe(`/api/sub/chat/room/${params.roomId}/members`, ({ body }) => {
      const enter = JSON.parse(body);
      let members = params.getMembers;
      let onMembers = [];

      for (let i = 0; i < enter.length; i++) {
        let id = enter[i];
        let array = members.filter(member => member.member.id === id);
        onMembers.push(array[0]);
      }

      params.setMembers(onMembers);
    });

    params.client.current.publish({
      destination: '/api/pub/room/join',
      body: JSON.stringify({
        roomId: params.roomId,
        memberId: params.member.id,
        message: '입장',
        type: 'TEXT',
      }),
    });
  } else if (params.option === 'room') {
    params.client.current.subscribe(`/api/sub/chat/room`, ({ body }) => {
      params.event().then(result => {
        params.setChatMessages(result);
      });
    });
  } else {
    params.client.current.subscribe(`/api/sub/notification`, ({ body }) => {
      const result = JSON.parse(body);
      if (params.member.id !== result.member.member.id) {
        params.fireNotification(`${result.member.member.name}`, { body: `${result.message}` });
      }
    });
  }
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
