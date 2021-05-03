import {FC, useEffect, useLayoutEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks';
import io, {Socket} from 'socket.io-client';
import {
  setList,
  startFetching,
  stopFetching,
  updateList,
} from '../store/slices/listSlice';

const ItemsList: FC = () => {
  const items = useAppSelector(store => store.list.value);
  const isActive = useAppSelector(store => store.list.isActiveConnection);
  const dispatch = useAppDispatch();
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    if (isActive) {
      socketRef.current = io('http://localhost:5000');
      socketRef.current.on('list:value', value => {
        dispatch(setList(value as number[]));
      });
      socketRef.current.on('list:update', value => {
        dispatch(updateList(value as [number, number]));
        performance.mark('list:update--start');
      });
      socketRef.current.emit('list:get');
    } else if (!!socketRef.current) {
      socketRef.current.disconnect();
      // console.log(performance.getEntriesByName('list:update'));
    }
    return () => {
      socketRef.current?.disconnect();
    };
  }, [isActive, dispatch]);
  useLayoutEffect(() => {
    performance.mark('list:update--end');
    try {
      performance.measure(
        're-render',
        'list:update--start',
        'list:update--end',
      );
    } catch (e) {
      console.log(e);
    }
  });
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
        onClick={() => dispatch(startFetching())}
      >
        start
      </button>
      <button
        disabled={!isActive}
        style={{background: !isActive ? void 0 : 'red', color: 'white'}}
        type="button"
        onClick={() => dispatch(stopFetching())}
      >
        stop
      </button>
    </div>
  );
};
export default ItemsList;
