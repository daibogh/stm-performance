import {declareAction, declareAtom} from '@reatom/core';

export const setListAction = declareAction<
  {width: number; backgroundColor: string}[]
>();
export const updateListAction = declareAction<[number]>('updateListAction');
export const listAtom = declareAtom(
  ($, state: {width: number; backgroundColor: string}[] = []) => {
    $(setListAction, payload => (state = payload));
    $(updateListAction, ([payload]: [number]) => (state[payload].width += 5));
    return state;
  },
);
