import {socketAtom} from './socketAtom';
import {listAtom} from './listAtom';
import {
  declareAction,
  declareAtom,
  map,
  combine,
  createStore,
} from '@reatom/core';
import {longOpAtom} from './longOpAtom';

const rootAtom = combine({
  list: listAtom,
  socket: socketAtom,
  longOp: longOpAtom,
});

export const reatomStore = createStore(rootAtom);
