import {FC} from 'react';
import {
  VictoryChart,
  VictoryTooltip,
  VictoryScatter,
  VictoryTheme,
  VictoryAxis,
} from 'victory';
const PerformanceChart: FC<any> = ({data}: any) => {
  return (
    <div style={{width: 600, height: 600}}>
      <VictoryChart
        theme={VictoryTheme.material}
        domain={{
          x: [data[0].startTime, data[data.length - 1].startTime],
          y: [0, data[0].duration + 1000],
        }}
      >
        <VictoryScatter
          labelComponent={<VictoryTooltip />}
          style={{
            data: {stroke: '#c43a31'},
            parent: {border: '1px solid #ccc'},
          }}
          data={data.map(
            ({startTime, duration}: {startTime: number; duration: number}) => ({
              x: startTime,
              y: duration,
              label: `duration: ${duration.toFixed(3)}ms`,
            }),
          )}
        />
        <VictoryAxis
          label="start time (ms)"
          style={{
            axisLabel: {padding: 30},
          }}
        />
        <VictoryAxis
          dependentAxis
          label="duration (ms)"
          style={{
            axisLabel: {padding: 40},
          }}
        />
      </VictoryChart>
    </div>
  );
};
export default PerformanceChart;
