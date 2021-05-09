import {createSlice} from '@reduxjs/toolkit';

export const matrixSlice = createSlice({
  name: 'matrix',
  initialState: {
    value: [] as {backgroundColor: string}[][],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    update: (
      state,
      action: {payload: {position: [number, number]; backgroundColor: string}},
    ) => {
      const {position, backgroundColor} = action.payload;
      state.value[position[0]][position[1]].backgroundColor = backgroundColor;
    },
  },
});

// Action creators are generated for each case reducer function
export const {set: setMatrix, update: updateMatrix} = matrixSlice.actions;

export default matrixSlice.reducer;
