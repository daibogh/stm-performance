import React, {FC} from 'react';
import {VictoryChart, VictoryTheme, VictoryArea, VictoryAxis} from 'victory';
const PerformanceChart: FC = (data: any) => {
  return (
    <div>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryArea data={data} />
        <VictoryAxis />
      </VictoryChart>
    </div>
  );
};
export default PerformanceChart;
