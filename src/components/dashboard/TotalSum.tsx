import { useSelector } from "@/lib/redux";
import { selectTotSum } from "@/lib/redux/dashboard/dashboardSlice";
import { RpInd } from "@/services/currency";

export default function TotalSum() {
  const totsum = useSelector(selectTotSum)

  return (
    <div className="row">
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-primary shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  PURCHASES
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {RpInd.format(totsum.totPurchase)}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-success shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                  SALES
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {RpInd.format(totsum.totSelling)}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-info shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                  EARNINGS
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {RpInd.format(totsum.totSelling - totsum.totPurchase)}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-warning shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  TOTAL SALES
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {totsum.totSales}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-comments fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
