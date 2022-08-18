import utils from './ApiUtil';
const { apiAuthUtil } = utils;

const getRoomList = async () => {
  try {
    const result = await apiAuthUtil.get(`api/v1/chat/rooms`);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

const getMessageList = async roomId => {
  try {
    const result = await apiAuthUtil.get(`api/v1/chat/rooms/${roomId}/messages`);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

const ChatApi = { getRoomList, getMessageList };
export default ChatApi;
