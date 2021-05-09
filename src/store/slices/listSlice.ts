import {createSlice} from '@reduxjs/toolkit';

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    value: [] as {width: number; backgroundColor: string}[],
    legacyList: Array.from({length: 999999}, (_, i) => i + 1),
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    update: (state, action: {payload: [number]}) => {
      const [index] = action.payload;
      if (state.value[index].width < 100) state.value[index].width += 5;
    },
    someLongOp: state => {
      state.legacyList.push(state.legacyList.length);
    },
  },
});

// Action creators are generated for each case reducer function
export const {set: setList,someLongOp, update: updateList} = listSlice.actions;

export default listSlice.reducer;
