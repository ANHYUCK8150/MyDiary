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

const getMessageList = async roomId => {
  try {
    const result = await apiAuthUtil.get(`api/v1/chat/rooms/${roomId}/messages`);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

const sendImageMessage = async imageFile => {
  try {
    const result = await apiFormUtil.post(`api/v1/chat/send-image`, imageFile);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const ChatApi = { getRoomList, getMessageList, sendImageMessage };
export default ChatApi;
