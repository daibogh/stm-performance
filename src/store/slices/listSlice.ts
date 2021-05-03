import {createSlice} from '@reduxjs/toolkit';

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    value: [] as number[],
    isActiveConnection: false,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    update: (state, action: {payload: [number, number]}) => {
      const [index, value] = action.payload;
      state.value[index] = value;
    },
    stop: state => {
      state.isActiveConnection = false;
    },
    start: state => {
      state.isActiveConnection = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  set: setList,
  update: updateList,
  stop: stopFetching,
  start: startFetching,
} = listSlice.actions;

export default listSlice.reducer;
