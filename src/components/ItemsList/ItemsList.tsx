import {FC, useCallback, useLayoutEffect, useMemo, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Socket} from 'socket.io-client';
import {setList, updateList, someLongOp} from '../../store/slices/listSlice';
import {useSocketConnection} from '../../hooks/useSocketConnection';
import {usePerformanceMeasure} from '../../hooks/usePerformanceMeasure';
const ItemsList: FC = () => {
  const items = useAppSelector(store => store.list.value);
  const dispatch = useAppDispatch();
  const {startMark, collectPerformanceList} = usePerformanceMeasure({
    startMark: 'list:update--start',
    endMark: 'list:update--end',
    measureMark: 'list:re-render',
  });
  const legacyCounterRef = useRef<any>(null);
  const onOpenSocket = useCallback(
    (socket: Socket) => {
      legacyCounterRef.current = setInterval(() => dispatch(someLongOp()), 500);
      socket.emit('list:get');
    },
    [dispatch],
  );
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
  const onCloseSocket = useCallback(() => {
    clearInterval(legacyCounterRef.current);
    console.log(collectPerformanceList());
  }, [collectPerformanceList]);
  useSocketConnection({
    onOpen: onOpenSocket,
    onClose: onCloseSocket,
    listeners,
  });
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
