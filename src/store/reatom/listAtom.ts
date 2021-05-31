import {declareAction, declareAtom} from '@reatom/core';

export const setListAction = declareAction<
  {width: number; backgroundColor: string}[]
>();
export const updateListAction = declareAction<[number]>();
export const listAtom = declareAtom(
  [] as {width: number; backgroundColor: string}[],
  {
    setList: (payload: {width: number; backgroundColor: string}[]) => payload,
    updateList: ([payload]: [number], state) =>
      state.map(({width, ...elem}, idx) => ({
        ...elem,
        width: idx === payload ? width + 5 : width,
      })),
  },
);
