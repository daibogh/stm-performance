import {MatrixStore} from './MatrixStore';
import {SocketStore} from './SocketStore';
import {ListStore} from './ListStore';
import {makeObservable, observable} from 'mobx';
import {createContext} from 'react';
export class RootStore {
  list = {} as ListStore;
  socket = {} as SocketStore;
  matrix = {} as MatrixStore;
  constructor() {
    makeObservable(this, {
      list: observable.ref,
      socket: observable.ref,
    });
    this.list = new ListStore();
    this.socket = new SocketStore();
    this.matrix = new MatrixStore();
  }
}
export const StoreContext = createContext<RootStore>({} as RootStore);
