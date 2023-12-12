import moment from "moment";

export default function PurchaseData({
  purchase,
}: {
  purchase: PurchasesType;
}) {
  return (
    <div className="card-body border-bottom pb-5">
      <div className="row">
        <div className="col-sm-4">
          <label htmlFor="invoice" className="form-label">
            Invoice
          </label>
          <input
            type="text"
            className="form-control"
            id="invoice"
            value={purchase?.invoice}
            disabled
          />
        </div>
        <div className="col-sm-4">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            type="text"
            className="form-control"
            id="time"
            value={moment(purchase?.createdAt).format("DD MMM YYYY HH:mm:ss")}
            disabled
          />
        </div>
        <div className="col-sm-4">
          <label htmlFor="operator" className="form-label">
            Operator
          </label>
          <input
            type="text"
            className="form-control"
            id="operator"
            value={purchase?.User.name}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
