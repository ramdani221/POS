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

  if (report.length === 0)
    return (
      <div className="alert alert-primary position-absolute top-50 start-50 translate-middle w-100 text-center" role="alert">
        There are no transaction on this date
      </div>
    );

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
