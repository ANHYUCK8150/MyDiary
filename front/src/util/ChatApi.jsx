import utils from './ApiUtil';
const { apiAuthUtil, apiFormUtil } = utils;

const getRoomList = async () => {
  try {
    const result = await apiAuthUtil.get(`api/v1/chat/rooms`);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

const getMessageList = async (param, setMessageList, setLoader) => {
  try {
    const result = await apiAuthUtil.get(`api/v1/chat/rooms/${param.roomId}/messages?page=${param.pageNum}`);
    result.data.contents
      .sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      })
      .map(data => {
        return setMessageList(_messageList => [..._messageList, data]);
      });
  } catch (error) {
    console.log(error.response.data);
  }
  setLoader(false);
};

const sendImageMessage = async imageFile => {
  try {
    const result = await apiFormUtil.post(`api/v1/chat/send-image`, imageFile);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const setRoom = async memberId => {
  try {
    const result = await apiAuthUtil.post(`api/v1/users/${memberId}/chat`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const ChatApi = { getRoomList, getMessageList, sendImageMessage, setRoom };
export default ChatApi;
