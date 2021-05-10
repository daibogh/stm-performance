import {FC, useCallback, useMemo, useRef, useState} from 'react';

import {Socket} from 'socket.io-client';
import {useSocketConnection} from '../../hooks/useSocketConnection';
import {usePerformanceMeasure} from '../../hooks/usePerformanceMeasure';
import {PerformanceChart} from '../PerformanceChart';
import {useAtom, useAction} from '@reatom/react';
import {
  listAtom,
  setListAction,
  updateListAction,
} from '../../store/reatom/listAtom';
import {longOpAction} from '../../store/reatom/longOpAtom';
const ItemsList: FC = () => {
  const [measure, setMeasure] = useState<any>();
  const legacyCounterRef = useRef<any>(null);
  const items = useAtom(listAtom);
  const setList = useAction(setListAction);
  const updateList = useAction(updateListAction);
  const someLongOp = useAction(longOpAction);
  const {startMark, endMark, collectPerformanceList} = usePerformanceMeasure({
    startMark: 'list:update--start',
    endMark: 'list:update--end',
    measureMark: 'list:re-render',
  });
  const onOpenSocket = useCallback(
    (socket: Socket) => {
      legacyCounterRef.current = setInterval(() => someLongOp(), 500);
      socket.emit('list:get');
    },
    [someLongOp],
  );
  const listeners = useMemo(
    () => ({
      'list:value': (value: number[]) => {
        setList(
          value.map(item => ({
            backgroundColor: `rgb(${Math.floor(
              Math.random() * 255,
            )},${Math.floor(Math.random() * 255)},${Math.floor(
              Math.random() * 255,
            )})`,
            width: item,
          })),
        );
      },
      'list:update': (value: [number]) => {
        startMark();
        updateList(value);
        endMark();
      },
    }),
    [endMark, setList, startMark, updateList],
  );
  const onCloseSocket = useCallback(() => {
    clearInterval(legacyCounterRef.current);
    const res = collectPerformanceList();
    console.log(res);
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
