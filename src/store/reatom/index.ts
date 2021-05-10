import {matrixAtom} from './matrixAtom';
import {socketAtom} from './socketAtom';
import {listAtom} from './listAtom';
import {
  declareAction,
  declareAtom,
  map,
  combine,
  createStore,
} from '@reatom/core';

const rootAtom = combine({
  list: listAtom,
  socket: socketAtom,
  matrix: matrixAtom,
});

export const reatomStore = createStore(rootAtom);
