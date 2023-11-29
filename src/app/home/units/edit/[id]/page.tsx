"use client";

import { useDispatch } from "@/lib/redux";
import { fetchGetUnit } from "@/lib/redux/units/unitAPI";
import { updateUnitAsync } from "@/lib/redux/units/unitSlice";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edite() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter()

  const [unit, setUnit] = useState({
    unit: "",
    name: "",
    note: ""
  });

  useEffect(() => {
    fetchGetUnit(Number(id))
      .then(({ data }) =>
        setUnit({ unit: data.unit, name: data.name, note: data.note })
      )
      .catch((err) => console.log(err));
  }, [id]);

  const submit = (e: Event) => {
    e.preventDefault()
    dispatch(updateUnitAsync({ id: Number(id), input: unit }))
      .then(() => router.push("/home/units"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Form edit</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <div
            id="dataTable_wrapper"
            className="dataTables_wrapper dt-bootstrap4"
          >
            <form>
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label"
                >
                  Unit
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={unit.unit}
                    onChange={(e) =>
                      setUnit({ ...unit, unit: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={unit.name}
                    onChange={(e) => setUnit({ ...unit, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Note</label>
                <div className="col-sm-9">
                <textarea className="form-control" id="exampleFormControlTextarea1" value={unit.note} rows={2} onChange={(e) => setUnit({ ...unit, note: e.target.value })}></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="card-footer py-3">
      <button className="btn btn-success btn-icon-split me-1" onClick={(e:any) => submit(e)}>
          <span className="icon text-white-50">
            <i className="fas fa-database"></i>
          </span>
          <span className="text">Save</span>
        </button>
        <Link href={'/home/units'} className="btn btn-warning btn-icon-split">
          <span className="icon text-white-50">
            <i className="fas fa-undo-alt"></i>
          </span>
          <span className="text">Back</span>
        </Link>
      </div>
    </div>
  );
}
