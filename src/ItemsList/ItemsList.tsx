import {FC, useRef} from 'react';
import {useAppSelector} from '../hooks';

const ItemsList: FC = () => {
  const items = useAppSelector(store => store.list.value);
  const isActive = useAppSelector(store => store.list.isActiveConnection);
  const socket = useRef<any>(null);
  return (
    <div>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <button
        disabled={isActive}
        style={{background: isActive ? void 0 : 'green', color: 'white'}}
        type="button"
      >
        start
      </button>
      <button
        disabled={!isActive}
        style={{background: !isActive ? void 0 : 'red', color: 'white'}}
        type="button"
      >
        stop
      </button>
    </div>
  );
};
export default ItemsList;
