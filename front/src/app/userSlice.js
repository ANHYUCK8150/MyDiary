/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'AHuser',
  initialState: {
    id: '',
    name: '',
    imageUrl: '',
    introduction: '',
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setIntroduction: (state, action) => {
      state.introduction = action.payload;
    },
    setClear: (state, action) => {
      Object.keys(state).forEach(key => {
        if (state[key]) {
          state[key] = '';
        }
      });
    },
  },
});

export const { setId, setName, setImageUrl, setIntroduction, setClear } = userSlice.actions;

export default userSlice.reducer;
