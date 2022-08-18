/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    title: '',
    back: false, //뒤로가기
    backHome: false, //홈으로 복귀(로그인 페이지에서 뒤로가기 시에 사용)
    settings: false, //세팅
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setBack: (state, action) => {
      state.back = action.payload;
    },
    setBackHome: (state, action) => {
      state.backHome = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setAllFalse: (state, action) => {
      Object.keys(state).forEach(key => {
        if (state[key]) {
          state[key] = false;
        }
      });
    },
  },
});

export const { setTitle, setBack, setBackHome, setAllFalse, setSettings } = headerSlice.actions;

export default headerSlice.reducer;
