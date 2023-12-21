import { useSelector } from "@/lib/redux";
import { selectReport } from "@/lib/redux/dashboard/dashboardSlice";
import Chart from "react-google-charts";

export default function LineChart() {
  const report = useSelector(selectReport);
  const data = [
    ["Year", "Earnings"],
    ...report.map((item) => [item.name, Number(item.earning)]),
  ];
  const options = {
    curveType: "function",
    legend: { position: "bottom" },
  };
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}
