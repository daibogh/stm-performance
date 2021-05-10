import {Socket} from 'socket.io-client';
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useSocketConnection} from '../../hooks/useSocketConnection';
import {setMatrix, updateMatrix} from '../../store/slices/matrixSlice';
import {
  EndMarkFunction,
  StartMarkFunction,
  usePerformanceMeasure,
} from '../../hooks/usePerformanceMeasure';
import {PerformanceChart} from '../PerformanceChart';
import {StoreContext} from '../../store/mobx';
import {useAction, useAtom} from '@reatom/react';
import {observer} from 'mobx-react-lite';
import {
  matrixAtom,
  pixelActions,
  setMatrixAction,
  updateMatrixAction,
} from '../../store/reatom/matrixAtom';
import {Atom, declareAction, PayloadActionCreator} from '@reatom/core';
const Pixel: FC<{
  atom: Atom<{value: string; updateMatrixAction: PayloadActionCreator<string>}>;
  position: [number, number];
  startMark: StartMarkFunction;
  endMark: EndMarkFunction;
  socket: Socket;
}> = ({atom, socket, startMark, endMark, position: [rowIdx, columnIdx]}) => {
  const {value: backgroundColor, updateMatrixAction} = useAtom(atom);
  const updatePixel = useAction(updateMatrixAction);
  useEffect(() => {
    socket.on(
      'matrix:update',
      (value: {position: [number, number]; backgroundColor: string}) => {
        if (value.position[0] === rowIdx && value.position[1] === columnIdx) {
          startMark();
          updatePixel(value.backgroundColor);
          endMark();
        }
      },
    );
  }, []);
  return <div style={{width: 1, height: 1, backgroundColor}} />;
};
const ItemsMatrix: FC = () => {
  const [measure, setMeasure] = useState<any>();
  const matrix = useAtom(matrixAtom);
  const setMatrix = useAction(setMatrixAction);
  const updateMatrix = useAction(updateMatrixAction);
  const updatePixel = useAction(
    ({
      position: [rowIdx, columnIdx],
      backgroundColor,
    }: {
      position: [number, number];
      backgroundColor: string;
    }) => {
      return declareAction<string>(`updateMatrixAction-${rowIdx}-${columnIdx}`)(
        backgroundColor,
      );
    },
  );
  const measureProps = useMemo(
    () => ({
      startMark: 'matrix:update--start',
      endMark: 'matrix:update--end',
      measureMark: 'matrix:re-render',
    }),
    [],
  );
  const {startMark, endMark, collectPerformanceList} = usePerformanceMeasure(
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
        updatePixel(value);
        endMark();
      },
    }),
    [endMark, setMatrix, startMark, updatePixel],
  );
  const onCloseSocket = useCallback(() => {
    const res = collectPerformanceList();
    console.log(res);
    setMeasure(res);
  }, [collectPerformanceList]);
  const {socket} = useSocketConnection({
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
          row.map((atom, columnIdx) => (
            <Pixel
              startMark={startMark}
              endMark={endMark}
              socket={socket}
              position={[rowIdx, columnIdx]}
              key={`row=${rowIdx}-column=${columnIdx}`}
              atom={atom}
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

export default ItemsMatrix;
