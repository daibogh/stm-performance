import {
  declareAction,
  declareAtom,
  map,
  combine,
  createStore,
  Atom,
  Action,
  PayloadActionCreator,
} from '@reatom/core';

export const setMatrixAction = declareAction<{backgroundColor: string}[][]>(
  'setMatrixAction',
);
export const updateMatrixAction = declareAction<{
  position: [number, number];
  backgroundColor: string;
}>('updateMatrixAction');
export const pixelActions: PayloadActionCreator<string>[][] = [];
export const matrixAtom = declareAtom<Atom<string>[][]>(
  'matrixAtom',
  [],
  on => [
    on(setMatrixAction, (_, payload) =>
      payload.map((row, rowIdx) =>
        row.map((elem, columnIdx) =>
          declareAtom(
            `pixelAtom-${rowIdx}-${columnIdx}`,
            elem.backgroundColor,
            _on => {
              const updateMatrixAction = declareAction<string>(
                `updateMatrixAction-${rowIdx}-${columnIdx}`,
              );
              if (!!pixelActions[rowIdx]) {
                pixelActions[rowIdx].push(updateMatrixAction);
              } else {
                pixelActions.push([updateMatrixAction]);
              }
              return [_on(updateMatrixAction, (state, payload) => payload)];
            },
          ),
        ),
      ),
    ),
  ],
);
