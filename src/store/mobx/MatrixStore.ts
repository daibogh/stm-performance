import {makeObservable, observable, makeAutoObservable} from 'mobx';
export class MatrixStore {
  value = [] as PixelStore[][];
  constructor() {
    makeObservable(this, {
      value: observable.ref,
    });
  }
  setMatrix = (value: {backgroundColor: string}[][]) => {
    this.value = value.map(arr => {
      return arr.map(elem => new PixelStore(elem.backgroundColor));
    });
  };
  update = (props: {position: [number, number]; backgroundColor: string}) => {
    const {position, backgroundColor} = props;
    this.value[position[0]][position[1]].setBackgroundColor(backgroundColor);
  };
}
class PixelStore {
  backgroundColor = '';
  constructor(backGroundColor: string) {
    this.backgroundColor = backGroundColor;
    makeAutoObservable(this);
  }
  setBackgroundColor(value: this['backgroundColor']) {
    this.backgroundColor = value;
  }
}
