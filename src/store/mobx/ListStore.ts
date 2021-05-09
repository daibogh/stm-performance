import {makeAutoObservable} from 'mobx';
export class ListStore {
  value = [] as {width: number; backgroundColor: string}[];
  constructor() {
    makeAutoObservable(this);
  }
  setList = (value: this['value']) => {
    this.value = value;
  };
  updateList = (value: [number]) => {
    const [index] = value;
    if (this.value[index].width < 100) this.value[index].width += 5;
  };
}
