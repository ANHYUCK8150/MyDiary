import utils from './ApiUtil';
const { apiUtil, apiAuthUtil } = utils;

const getMemoList = async (param, setMemoList, setLoader) => {
  try {
    const result = await apiUtil.get(`api/v1/memo?page=${param.pageNum}&sort=id,desc`);
    result.data.contents.map(data => {
      return setMemoList(_memoList => [..._memoList, data]);
    });
  } catch (error) {
    console.log(error);
  }
  setLoader(false);
};

const getMyMemoList = async (param, setMemoList, setLoader) => {
  try {
    const result = await apiUtil.get(`api/v1/users/${param.memberId}/memo?page=${param.pageNum}&sort=id,desc`);
    result.data.contents.map(data => {
      return setMemoList(_memoList => [..._memoList, data]);
    });
  } catch (error) {
    console.log(error);
  }
  setLoader(false);
};

const getCategoryList = async setCategoryList => {
  try {
    const { data } = await apiUtil.get(`api/v1/memo/category`);
    setCategoryList([...data]);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const setMemo = async memoInfo => {
  try {
    const result = await apiAuthUtil.post(`api/v1/memo`, memoInfo);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const updateMemo = async memoInfo => {
  try {
    const result = await apiAuthUtil.put(`api/v1/memo/${memoInfo.id}`, memoInfo);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const removeMemo = async memoId => {
  try {
    const result = await apiAuthUtil.delete(`api/v1/memo/${memoId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const MemoApi = { getMemoList, setMemo, removeMemo, updateMemo, getMyMemoList, getCategoryList };
export default MemoApi;
