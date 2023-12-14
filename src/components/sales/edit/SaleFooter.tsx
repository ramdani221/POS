import { useDispatch, useSelector } from "@/lib/redux";
import { loadCustomerAsync, selectCustomers } from "@/lib/redux/customers/customerSlice";
import { updateSaleAsync } from "@/lib/redux/sales/saleSlice";
import { RpInd } from "@/services/currency";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SaleFooter({
  id,
  sale,
  totalSum,
}: {
  id: string;
  sale: SalesType;
  totalSum: string;
}) {
  const customers = useSelector(selectCustomers);
  const dispatch = useDispatch();
  const [customerId, setCustomerId] = useState(0);
  const [pay, setPay] = useState('0')
  const change = Number(pay) - Number(totalSum)
  const route = useRouter();

  const finish = (e: any) => {
    e.preventDefault();
    dispatch(
      updateSaleAsync({
        id: Number(id),
        input: {
          totalsum: totalSum,
          customer: customerId,
          operator: sale.operator,
          pay: pay.toString(),
          change: change.toString()
        },
      })
    );
    route.push("/home/sales");
  };

  useEffect(() => {
    setCustomerId(sale.customer || customers[0].id);
    setPay(sale.pay)
  }, [customers, sale]);

  useEffect(() => {
    dispatch(
      loadCustomerAsync({
        keyword: "",
        limit: "null",
        page: 1,
        sort: "asc",
        sortBy: "id",
      })
    );
  }, [dispatch]);

  return (
    <div className="card-footer py-3">
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Total Summary</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            value={RpInd.format(totalSum)}
            required
            disabled
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Pay</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            value={pay}
            required
            onChange={(e) => setPay(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Change</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            value={RpInd.format(change)}
            required
            disabled
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Customer</label>
        <div className="col-sm-10">
          <select
            className="form-select text-gray-700"
            aria-label="Default select example"
            value={customerId}
            required
            onChange={(e) => setCustomerId(Number(e.target.value))}
          >
            {customers.map((customer) => (
              <option value={customer.id} key={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-success btn-icon-split me-1"
        onClick={(e) => finish(e)}
      >
        <span className="icon text-white-50">
          <i className="fas fa-plus"></i>
        </span>
        <span className="text">Finish</span>
      </button>
      <Link href={"/home/sales"} className="btn btn-warning btn-icon-split">
        <span className="icon text-white-50">
          <i className="fas fa-arrow-left"></i>
        </span>
        <span className="text">Back</span>
      </Link>
    </div>
  );
}
