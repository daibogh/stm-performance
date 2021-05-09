import {FC, useCallback, useLayoutEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Socket} from 'socket.io-client';
import {setList, updateList} from '../../store/slices/listSlice';
import {useSocketConnection} from '../../hooks/useSocketConnection';
import {usePerformanceMeasure} from '../../hooks/usePerformanceMeasure';
const ItemsList: FC = () => {
  const items = useAppSelector(store => store.list.value);
  const dispatch = useAppDispatch();
  const startMark = usePerformanceMeasure({
    startMark: 'list:update--start',
    endMark: 'list:update--end',
    measureMark: 'list:re-render',
  });
  const onOpenSocket = useCallback((socket: Socket) => {
    socket.emit('list:get');
  }, []);
  const listeners = useMemo(
    () => ({
      'list:value': (value: number[]) => {
        dispatch(
          setList(
            value.map(item => ({
              backgroundColor: `rgb(${Math.floor(
                Math.random() * 255,
              )},${Math.floor(Math.random() * 255)},${Math.floor(
                Math.random() * 255,
              )})`,
              width: item,
            })),
          ),
        );
      },
      'list:update': (value: [number]) => {
        dispatch(updateList(value));
        startMark();
      },
    }),
    [dispatch, startMark],
  );
  const stopSocketFn = useSocketConnection({onOpen: onOpenSocket, listeners});
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
  useLayoutEffect(() => {
    if (items.every(elem => elem.width >= 100)) {
      stopSocketFn();
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
    </div>
  );
};
export default ItemsList;
