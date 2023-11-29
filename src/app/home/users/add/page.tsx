"use client";

import { useDispatch } from "@/lib/redux";
import { addUserAsync } from "@/lib/redux/users/userSlice";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import { useState } from "react";

export default function Edite() {
  const dispatch = useDispatch();
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    role: "Oprator",
  });

  const submit = (e: any) => {
    e.preventDefault()
    dispatch(addUserAsync(user))
      .then(() => router.push('/home/users'))
      .catch((err) => console.log(err));
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Form add</h6>
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
                  htmlFor="inputEmail3"
                  className="col-sm-3 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail3"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
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
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-3 col-form-label"
                >
                  Password
                </label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword3"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-3 pt-0">Role</legend>
                <div className="col-sm-9">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios1"
                      value="Oprator"
                      checked={user.role === "Oprator"}
                      onChange={(e) =>
                        setUser({ ...user, role: e.target.value })
                      }
                    />
                    <label className="form-check-label" htmlFor="gridRadios1">
                      Oprator
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios2"
                      value="Admin"
                      onChange={(e) =>
                        setUser({ ...user, role: e.target.value })
                      }
                    />
                    <label className="form-check-label" htmlFor="gridRadios2">
                      Admin
                    </label>
                  </div>
                </div>
              </fieldset>
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
        <Link href={'/home/users'} className="btn btn-warning btn-icon-split">
          <span className="icon text-white-50">
            <i className="fas fa-undo-alt"></i>
          </span>
          <span className="text">Back</span>
        </Link>
      </div>
    </div>
  );
}
