import {Socket} from 'socket.io-client';
import React, {FC, useCallback, useContext, useMemo, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useSocketConnection} from '../../hooks/useSocketConnection';
import {setMatrix, updateMatrix} from '../../store/slices/matrixSlice';
import {usePerformanceMeasure} from '../../hooks/usePerformanceMeasure';
import {PerformanceChart} from '../PerformanceChart';
import {StoreContext} from '../../store/mobx';
import {observer} from 'mobx-react-lite';
const ItemsMatrix: FC = () => {
  const [measure, setMeasure] = useState<any>();
  const {
    matrix: {value: matrix, setMatrix, update: updateMatrix},
  } = useContext(StoreContext);

  const measureProps = useMemo(
    () => ({
      startMark: 'matrix:update--start',
      endMark: 'matrix:update--end',
      measureMark: 'matrix:re-render',
    }),
    [],
  );
  const {startMark, collectPerformanceList} = usePerformanceMeasure(
    measureProps,
  );
  const onOpenSocket = useCallback((socket: Socket) => {
    socket.emit('matrix:get');
  }, []);
  const listeners = useMemo(
    () => ({
      'matrix:value': (value: {backgroundColor: string}[][]) => {
        setMatrix(value);
      },
      'matrix:update': (value: {
        position: [number, number];
        backgroundColor: string;
      }) => {
        startMark();
        updateMatrix(value);
      },
    }),
    [setMatrix, startMark, updateMatrix],
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${matrix.length}, 1px)`,
        }}
      >
        {matrix.map((row, rowIdx) =>
          row.map((elem, columnIdx) => (
            <div
              key={`row=${rowIdx}-column=${columnIdx}`}
              style={{
                width: 1,
                height: 1,
                backgroundColor: elem.backgroundColor,
              }}
            />
          )),
        )}
      </div>
      {measure != null && measure.length !== 0 && (
        <PerformanceChart data={measure} />
      )}
    </div>
  );
};

export default observer(ItemsMatrix);
