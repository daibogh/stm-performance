import {
  declareAction,
  declareAtom,
  map,
  combine,
  createStore,
} from '@reatom/core';

export const setListAction = declareAction<
  {width: number; backgroundColor: string}[]
>('setListAction');
export const updateListAction = declareAction<[number]>('updateListAction');
export const listAtom = declareAtom<{width: number; backgroundColor: string}[]>(
  'listAtom',
  [],
  on => [
    on(setListAction, (_, payload) => payload),
    on(updateListAction, (state, [idx]) =>
      state.map((elem, _idx) =>
        idx === _idx ? {...elem, width: elem.width + 5} : elem,
      ),
    ),
  ],
);
