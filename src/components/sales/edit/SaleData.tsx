import moment from "moment";

export default function SaleData({
  sale,
}: {
  sale: SalesType;
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
            value={sale?.invoice}
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
            value={moment(sale?.createdAt).format("DD MMM YYYY HH:mm:ss")}
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
            value={sale?.User.name}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
