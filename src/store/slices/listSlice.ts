import {createSlice} from '@reduxjs/toolkit';

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    value: [] as {width: number; backgroundColor: string}[],
    isActiveConnection: false,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    update: (state, action: {payload: [number]}) => {
      const [index] = action.payload;
      if (state.value[index].width < 100) state.value[index].width += 5;
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
