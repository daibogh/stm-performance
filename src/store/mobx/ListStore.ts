import {makeAutoObservable} from 'mobx';
export class ListStore {
  value = [] as {width: number; backgroundColor: string}[];
  legacyList = Array.from({length: 999999}, (_, i) => i + 1);
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
  someLongOp = () => {
    this.legacyList.push(this.legacyList.length);
  };
}
