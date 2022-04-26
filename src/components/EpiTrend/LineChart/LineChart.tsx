import React, { useEffect } from "react";
import { Line } from "@antv/g2plot";
import "./LineChart.css";
export type ChartData = {
  X: string;
  Y: number;
  dataType: string;
};

const LineChart: React.FC<{ data: ChartData[]; chartId: string }> = ({
  data,
  chartId,
}) => {
  useEffect(() => {
    if (data.length > 0) {
      const line = new Line(chartId, {
        data,
        xField: "X",
        yField: "Y",
        seriesField: "dataType",
      });
      line.render();
    }
  }, [data]);
  return <div id={chartId} className="line-chart"></div>;
};

export default LineChart;
