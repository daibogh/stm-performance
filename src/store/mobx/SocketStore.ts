import {makeAutoObservable} from 'mobx';
export class SocketStore {
  isActiveConnection = false;
  constructor() {
    makeAutoObservable(this);
  }

  start = () => {
    this.isActiveConnection = true;
  };
  stop = () => {
    this.isActiveConnection = false;
  };
}
