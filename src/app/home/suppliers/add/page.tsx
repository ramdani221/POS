"use client";

import { useDispatch } from "@/lib/redux";
import { addSupplierAsync } from "@/lib/redux/suppliers/supplierSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Edite() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [supplier, setSupplier] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const submit = (e: any) => {
    e.preventDefault();
    dispatch(addSupplierAsync(supplier));
    router.push("/home/suppliers");
  };

  return (
    <div className="card shadow mb-4">
      <form onSubmit={submit}>
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Form add</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setSupplier({
                    ...supplier,
                    name: e.target.value
                  })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Address</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  required
                  rows={2}
                  onChange={(e) => setSupplier({
                    ...supplier,
                    address: e.target.value
                  })}
                ></textarea>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Phone</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setSupplier({
                    ...supplier,
                    phone: e.target.value
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer py-3">
          <button type="submit" className="btn btn-success btn-icon-split me-1">
            <span className="icon text-white-50">
              <i className="fas fa-database"></i>
            </span>
            <span className="text">Save</span>
          </button>
          <Link
            href={"/home/suppliers"}
            className="btn btn-warning btn-icon-split"
          >
            <span className="icon text-white-50">
              <i className="fas fa-undo-alt"></i>
            </span>
            <span className="text">Back</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
