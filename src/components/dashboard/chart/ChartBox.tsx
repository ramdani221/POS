import LineChart from "./LineChart";
import PieChart from "./PieChart";

export default function ChartBox() {
  return (
    <div className="row">
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              Earnings Overview
            </h6>
          </div>
          <div className="card-body">
            <div className="chart-area">
              <LineChart />
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              Earnings Overview
            </h6>
          </div>
          <div className="card-body">
            <div className="chart-area position-relative">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
