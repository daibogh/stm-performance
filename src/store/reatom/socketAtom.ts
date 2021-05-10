import {
  declareAction,
  declareAtom,
  map,
  combine,
  createStore,
} from '@reatom/core';

export const startSocketAction = declareAction('startSocketAction');
export const stopSocketAction = declareAction('stopSocketAction');
export const socketAtom = declareAtom('socketAtom', false, on => [
  on(startSocketAction, () => true),
  on(stopSocketAction, () => false),
]);
