import {FC, useCallback, useMemo, useState} from 'react';

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
const ItemsList: FC = () => {
  const [measure, setMeasure] = useState<any>();
  const items = useAtom(listAtom);
  const setList = useAction(setListAction);
  const updateList = useAction(updateListAction);
  const {startMark, endMark, collectPerformanceList} = usePerformanceMeasure({
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
        updateList(value);
        startMark();
      },
    }),
    [endMark, setList, startMark, updateList],
  );
  const onCloseSocket = useCallback(() => {
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
