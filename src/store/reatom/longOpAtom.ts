import {
  declareAction,
  declareAtom,
  map,
  combine,
  createStore,
} from '@reatom/core';

export const longOpAction = declareAction('longOpAction');
export const longOpAtom = declareAtom<number[]>('listAtom', [], on => [
  on(longOpAction, state => [...state, state.length]),
]);
