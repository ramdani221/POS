"use client";

import { useDispatch, useSelector } from "@/lib/redux";
import { getUser, getUserAsync, updateUserAsync } from "@/lib/redux/users/userSlice";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edite() {
  const { id } = useParams();
  const user = useSelector(getUser)
  const dispatch = useDispatch();
  const router = useRouter();

  const [input, setInput] = useState({ 
    email: "", 
    name: "", 
    role: "" 
  });

  useEffect(() => {
    dispatch(getUserAsync(Number(id)))
  }, [dispatch, id]);

  useEffect(() => {
    setInput({
      email: user.email,
      name: user.name,
      role: user.role
    })
  }, [user])

  const submit = (e: any) => {
    e.preventDefault();
    dispatch(updateUserAsync({ id: Number(id), input }))
    router.push("/home/users")
  };

  return (
    <div className="card shadow mb-4">
      <form onSubmit={submit}>
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Form edit</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="row mb-3 me-">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail3"
                  required
                  value={input.email}
                  onChange={(e) => setInput({ ...input, email: e.target.value })}
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
            <fieldset className="row mb-3">
              <legend className="col-form-label col-sm-2 pt-0">Role</legend>
              <div className="col-sm-10">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios1"
                    value="Oprator"
                    required
                    checked={input.role === "Oprator"}
                    onChange={(e) => setInput({ ...input, role: e.target.value })}
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
                    checked={input.role === "Admin"}
                    onChange={(e) => setInput({ ...input, role: e.target.value })}
                  />
                  <label className="form-check-label" htmlFor="gridRadios2">
                    Admin
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="card-footer py-3">
          <button type="submit" className="btn btn-success btn-icon-split me-1">
            <span className="icon text-white-50">
              <i className="fas fa-database"></i>
            </span>
            <span className="text">Save</span>
          </button>
          <Link href={"/home/users"} className="btn btn-warning btn-icon-split">
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
