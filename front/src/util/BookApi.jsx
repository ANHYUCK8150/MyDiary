import utils from './ApiUtil';
const { apiUtil, apiAuthUtil } = utils;

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

const setBook = async bookInfo => {
  try {
    const result = await apiAuthUtil.post(`api/v1/books`, bookInfo);
    const data = result.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getBook = async bookId => {
  try {
    const result = await apiUtil.get(`api/v1/books/${bookId}`);
    const data = result.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getBookList = async (param, setBookList, setLoader) => {
  try {
    const result = await apiUtil.get(`api/v1/books?page=${param.page}&sort=id,desc&status=${param.status}`);
    result.data.contents.map(data => {
      return setBookList(_bookList => [..._bookList, data]);
    });
  } catch (error) {
    console.log(error);
  }
  setLoader(false);
};

const getMemberBookList = async (param, setBookList, setLoader) => {
  try {
    const result = await apiUtil.get(`api/v1/users/${param.memberId}/books?page=${param.page}&sort=id,desc`);
    result.data.contents.map(data => {
      return setBookList(_bookList => [..._bookList, data]);
    });
  } catch (error) {
    console.log(error);
  }
  setLoader(false);
};

const setBookPage = async (bookId, bookPage) => {
  try {
    const result = await apiAuthUtil.put(`api/v1/books/${bookId}`, bookPage);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async bookId => {
  try {
    const result = await apiAuthUtil.delete(`api/v1/books/${bookId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const BookApi = { ApiSearch, setBook, getBook, getBookList, getMemberBookList, setBookPage, deleteBook };
export default BookApi;
