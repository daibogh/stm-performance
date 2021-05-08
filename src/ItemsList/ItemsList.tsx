import {FC, useEffect, useLayoutEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks';
import io, {Socket} from 'socket.io-client';
import {
  setList,
  someLongOp,
  startFetching,
  stopFetching,
  updateList,
} from '../store/slices/listSlice';

const ItemsList: FC = () => {
  const items = useAppSelector(store => store.list.value);
  const isActive = useAppSelector(store => store.list.isActiveConnection);
  const dispatch = useAppDispatch();
  const socketRef = useRef<Socket | null>(null);
  const legacyCounterRef = useRef<any>(null);
  useEffect(() => {
    if (isActive) {
      legacyCounterRef.current = setInterval(() => dispatch(someLongOp()), 500);
      socketRef.current = io('http://localhost:5000');
      socketRef.current.on('list:value', value => {
        dispatch(
          setList(
            value.map((item: number) => ({
              backgroundColor: `rgb(${Math.floor(
                Math.random() * 255,
              )},${Math.floor(Math.random() * 255)},${Math.floor(
                Math.random() * 255,
              )})`,
              width: item,
            })),
          ),
        );
      });
      socketRef.current.on('list:update', value => {
        dispatch(updateList(value as [number]));
        performance.mark('list:update--start');
      });
      socketRef.current.emit('list:get');
    } else {
      if (!!legacyCounterRef.current) {
        clearInterval(legacyCounterRef.current);
      }
      if (!!socketRef.current) {
        socketRef.current.disconnect();
        // console.log(performance.getEntriesByName('list:update'));
      }
    }
    return () => {
      clearInterval(legacyCounterRef.current);
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
      if (items.every(elem => elem.width >= 100)) {
        dispatch(stopFetching());
      }
    } catch (e) {
      console.log(e);
    }
  });
  return (
    <div>
      <ul>
        {items.map((item, idx) => (
          <li
            key={idx}
            style={{
              background: item.backgroundColor,
              width: item.width,
            }}
          />
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
