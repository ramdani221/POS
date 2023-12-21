import { useSelector } from "@/lib/redux";
import { selectTotSum } from "@/lib/redux/dashboard/dashboardSlice";
import Chart from "react-google-charts";

export default function PieChart() {
  const dataChart = useSelector(selectTotSum);
  const data = [
    ["Source", "Lots of Sale"],
    ["Customer", dataChart.totSales - dataChart.nonMember],
    ["Direct", dataChart.nonMember]
  ];
  const options = {
    curveType: "function",
    legend: { position: "bottom" },
  };
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}
