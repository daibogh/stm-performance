import {createSlice} from '@reduxjs/toolkit';

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    value: [] as {width: number; backgroundColor: string}[],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    update: (state, action: {payload: [number]}) => {
      const [index] = action.payload;
      if (state.value[index].width < 100) state.value[index].width += 5;
    },
  },
});

// Action creators are generated for each case reducer function
export const {set: setList, update: updateList} = listSlice.actions;

export default listSlice.reducer;
