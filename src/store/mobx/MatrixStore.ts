import {makeAutoObservable} from 'mobx';
export class MatrixStore {
  value = [] as {backgroundColor: string}[][];
  constructor() {
    makeAutoObservable(this);
  }
  setMatrix = (value: this['value']) => {
    this.value = value;
  };
  update = (props: {position: [number, number]; backgroundColor: string}) => {
    const {position, backgroundColor} = props;
    this.value[position[0]][position[1]].backgroundColor = backgroundColor;
  };
}
