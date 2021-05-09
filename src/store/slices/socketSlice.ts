import {createSlice} from '@reduxjs/toolkit';

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    isActiveConnection: false,
  },
  reducers: {
    stop: state => {
      state.isActiveConnection = false;
    },
    start: state => {
      state.isActiveConnection = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {stop: stopSocket, start: startSocket} = socketSlice.actions;

export default socketSlice.reducer;
