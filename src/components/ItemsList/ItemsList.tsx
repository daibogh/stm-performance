import {
  FC,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Socket} from 'socket.io-client';
import {setList, updateList, someLongOp} from '../../store/slices/listSlice';
import {useSocketConnection} from '../../hooks/useSocketConnection';
import {usePerformanceMeasure} from '../../hooks/usePerformanceMeasure';
import {PerformanceChart} from '../PerformanceChart';
const ItemsList: FC = () => {
  const [measure, setMeasure] = useState<any>();
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
        startMark();
        dispatch(updateList(value));
      },
    }),
    [dispatch, startMark],
  );
  const onCloseSocket = useCallback(() => {
    const res = collectPerformanceList();
    console.log(res);
    clearInterval(legacyCounterRef.current);
    setMeasure(res);
  }, [collectPerformanceList]);
  useSocketConnection({
    onOpen: onOpenSocket,
    onClose: onCloseSocket,
    listeners,
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
      {measure != null && measure.length !== 0 && (
        <PerformanceChart data={measure} />
      )}
    </div>
  );
};
export default ItemsList;
