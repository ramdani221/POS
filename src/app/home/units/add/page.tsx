"use client";

import { useDispatch } from "@/lib/redux";
import { addUnitAsync } from "@/lib/redux/units/unitSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Edite() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [unit, setUnit] = useState({
    unit: "",
    name: "",
    note: "",
  });

  const submit = (e: any) => {
    e.preventDefault();
    dispatch(addUnitAsync(unit))
      .then(() => router.push("/home/units"))
      .catch((err) => console.log(err));
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
              <label className="col-sm-2 col-form-label">Unit</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setUnit({ ...unit, unit: e.target.value })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setUnit({ ...unit, name: e.target.value })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Note</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  required
                  rows={2}
                  onChange={(e) => setUnit({ ...unit, note: e.target.value })}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer py-3">
          <button className="btn btn-success btn-icon-split me-1" type="submit">
            <span className="icon text-white-50">
              <i className="fas fa-database"></i>
            </span>
            <span className="text">Save</span>
          </button>
          <Link href={"/home/units"} className="btn btn-warning btn-icon-split">
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
