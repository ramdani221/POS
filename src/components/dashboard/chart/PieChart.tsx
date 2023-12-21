import { useSelector } from "@/lib/redux";
import { selectTotSum } from "@/lib/redux/dashboard/dashboardSlice";
import Chart from "react-google-charts";

export default function PieChart() {
  const dataChart = useSelector(selectTotSum);
  const data = [
    ["Source", "Lots of Sale"],
    ["Customer", dataChart.totSales - dataChart.nonMember],
    ["Direct", dataChart.nonMember],
  ];
  const options = {
    curveType: "function",
    legend: { position: "bottom" },
  };

  if (dataChart.totSales === 0)
    return (
      <div className="alert alert-primary position-absolute top-50 start-50 translate-middle w-100 text-center" role="alert">
        There are no sales on this date
      </div>
    );

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
