"use client";

import { useDispatch, useSelector } from "@/lib/redux";
import { getUnit, getUnitAsync, updateUnitAsync } from "@/lib/redux/units/unitSlice";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edite() {
  const { id } = useParams();
  const unit = useSelector(getUnit);
  const dispatch = useDispatch();
  const router = useRouter();

  const [input, setInput] = useState({
    unit: "",
    name: "",
    note: "",
  });

  useEffect(() => {
    dispatch(getUnitAsync(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    setInput({
      unit: unit.unit,
      name: unit.name,
      note: unit.note,
    });
  }, [unit]);

  const submit = (e: any) => {
    e.preventDefault();
    dispatch(updateUnitAsync({ id: Number(id), input }));
    router.push("/home/units");
  };

  return (
    <div className="card shadow mb-4">
      <form onSubmit={submit}>
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Form edit</h6>
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
                  value={input.unit}
                  onChange={(e) => setInput({ ...input, unit: e.target.value })}
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
                  value={input.name}
                  onChange={(e) => setInput({ ...input, name: e.target.value })}
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
                  value={input.note}
                  rows={2}
                  onChange={(e) => setInput({ ...input, note: e.target.value })}
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
