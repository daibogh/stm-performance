import {
  declareAction,
  declareAtom,
  map,
  combine,
  createStore,
} from '@reatom/core';

export const setMatrixAction = declareAction<{backgroundColor: string}[][]>(
  'setMatrixAction',
);
export const updateMatrixAction = declareAction<{
  position: [number, number];
  backgroundColor: string;
}>('updateMatrixAction');
export const matrixAtom = declareAtom<{backgroundColor: string}[][]>(
  'matrixAtom',
  [],
  on => [
    on(setMatrixAction, (_, payload) => payload),
    on(
      updateMatrixAction,
      (state, {position: [rowIdx, colIdx], backgroundColor}) =>
        state.map((row, _rowIdx) =>
          row.map((elem, _colIdx) =>
            rowIdx === _rowIdx && colIdx === _colIdx
              ? {backgroundColor}
              : {...elem},
          ),
        ),
    ),
  ],
);
