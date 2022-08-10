import utils from './ApiUtil';
const { apiUtil, apiAuthUtil, accessToken, formUtil } = utils;

const login = async (name, password) => {
  try {
    const result = await apiUtil.post(`api/v1/users/login`, { name: name, password: password });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const signUp = async formData => {
  try {
    const result = await formUtil.post(`api/v1/users`, formData);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUser = async () => {
  try {
    if (!localStorage.getItem(accessToken)) {
      return Promise.reject('No access token set.');
    }
    const result = await apiAuthUtil.get(`api/v1/users/login/checked`);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return Promise.reject(error);
  }
};

const SignApi = { login, getCurrentUser, signUp };
export default SignApi;
