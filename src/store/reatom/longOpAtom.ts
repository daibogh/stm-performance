import {
  declareAction,
  declareAtom,
  map,
  combine,
  createStore,
} from '@reatom/core';

export const longOpAction = declareAction('longOpAction');
export const longOpAtom = declareAtom<number[]>(
  'listAtom',
  Array.from({length: 999999}, (_, i) => i + 1),
  on => [on(longOpAction, state => [...state, state.length])],
);
