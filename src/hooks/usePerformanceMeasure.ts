import {useCallback} from 'react';
type StartMarkFunction = () => void;
type EndMarkFunction = () => void;
type CollectPerformanceFunction = () => void;
export const usePerformanceMeasure = ({
  startMark,
  endMark,
  measureMark,
}: {
  startMark: string;
  endMark: string;
  measureMark: string;
}): {
  startMark: StartMarkFunction;
  endMark: EndMarkFunction;
  collectPerformanceList: CollectPerformanceFunction;
} => {
  return {
    startMark: useCallback(() => {
      performance.mark(startMark);
    }, [startMark]),
    endMark: useCallback(() => {
      performance.mark(endMark);
      try {
        performance.measure(measureMark, startMark, endMark);
      } catch (e) {
        console.log(e);
      }
    }, [endMark, measureMark, startMark]),
    collectPerformanceList: useCallback(
      () => performance.getEntriesByName(measureMark),
      [measureMark],
    ),
  };
};
