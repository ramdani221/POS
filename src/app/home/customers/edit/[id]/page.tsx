"use client";

import { useDispatch, useSelector } from "@/lib/redux";
import { getCostumer, getCustomerAsync, updateCustomerAsync } from "@/lib/redux/customers/customerSlice";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edite() {
  const { id } = useParams();
  const customer = useSelector(getCostumer);
  const dispatch = useDispatch();
  const router = useRouter();

  const [input, setInput] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const submit = (e: any) => {
    e.preventDefault();
    dispatch(updateCustomerAsync({ id: Number(id), input }))
    router.push("/home/customers")
  };

  useEffect(() => {
    dispatch(getCustomerAsync(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    setInput({
      name: customer.name,
      address: customer.address,
      phone: customer.phone,
    });
  }, [customer]);

  return (
    <div className="card shadow mb-4">
      <form onSubmit={submit}>
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Form edit</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={input.name}
                  required
                  onChange={(e) => setInput({
                    ...input,
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
                  value={input.address}
                  required
                  rows={2}
                  onChange={(e) => setInput({
                    ...input,
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
                  value={input.phone}
                  required
                  onChange={(e) =>
                    setInput({ ...input, phone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer py-3">
          <button type="submit"
            className="btn btn-success btn-icon-split me-1">
            <span className="icon text-white-50">
              <i className="fas fa-database"></i>
            </span>
            <span className="text">Save</span>
          </button>
          <Link href={"/home/customers"} className="btn btn-warning btn-icon-split">
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
