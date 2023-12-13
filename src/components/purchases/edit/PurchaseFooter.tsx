import { useDispatch, useSelector } from "@/lib/redux";
import { updatePurchaseAsync } from "@/lib/redux/purchases/purchaseSlice";
import {
  loadSupplierAsync,
  selectSuppliers,
} from "@/lib/redux/suppliers/supplierSlice";
import { RpInd } from "@/services/service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PurchaseFooter({
  id,
  purchase,
  totalSum,
}: {
  id: string;
  purchase: PurchasesType;
  totalSum: string;
}) {
  const suppliers = useSelector(selectSuppliers);
  const dispatch = useDispatch();
  const [supplierId, setSuplierId] = useState(0);
  const route = useRouter();

  const finish = (e: any) => {
    e.preventDefault();
    dispatch(
      updatePurchaseAsync({
        id: Number(id),
        input: {
          totalsum: totalSum,
          supplier: supplierId,
          operator: purchase.operator,
        },
      })
    );
    route.push("/home/purchases");
  };

  useEffect(() => {
    setSuplierId(purchase.supplier || suppliers[0].id);
  }, [suppliers, purchase.supplier]);

  useEffect(() => {
    dispatch(
      loadSupplierAsync({
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
        <label className="col-sm-2 col-form-label">Supplier</label>
        <div className="col-sm-10">
          <select
            className="form-select text-gray-700"
            aria-label="Default select example"
            value={supplierId}
            required
            onChange={(e) => setSuplierId(Number(e.target.value))}
          >
            {suppliers.map((supplier) => (
              <option value={supplier.id} key={supplier.id}>
                {supplier.name}
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
      <Link href={"/home/purchases"} className="btn btn-warning btn-icon-split">
        <span className="icon text-white-50">
          <i className="fas fa-arrow-left"></i>
        </span>
        <span className="text">Back</span>
      </Link>
    </div>
  );
}
