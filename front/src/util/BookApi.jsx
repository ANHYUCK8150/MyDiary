import utils from './ApiUtil';
const { apiUtil, apiAuthUtil, apiFormUtil } = utils;

const ApiSearch = async (pageNum, query) => {
  const encodingQuery = encodeURIComponent(query.trim());
  try {
    const result = await apiUtil.get(`api/v1/books/api?page=${pageNum}&query=${encodingQuery}`);
    const data = result.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const BookApi = { ApiSearch };
export default BookApi;
