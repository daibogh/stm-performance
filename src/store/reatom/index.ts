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
});

export const reatomStore = createStore(rootAtom);
