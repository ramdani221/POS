"use client";

import { useDispatch, useSelector } from "@/lib/redux";
import { fetchUpdateUser } from "@/lib/redux/users/userAPI";
import { getUser, getUserAsync } from "@/lib/redux/users/userSlice";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Edite() {
  const { data: session,  update }: {data: any, update: any} = useSession();
  const id = session?.user?.id;
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [input, setInput] = useState({
    email: "",
    name: "",
    role: "",
  });

  useEffect(() => {
    dispatch(getUserAsync(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    setInput({
      email: user?.email,
      name: user?.name,
      role: user?.role,
    });
  }, [user]);

  const submit = (e: any) => {
    e.preventDefault();
    setIsSuccess(false)
    setIsFailed(false)
    fetchUpdateUser( id, input )
      .then(() => {
        setIsSuccess(true)
        return new Promise(resolve => 
          setTimeout(() => {
            resolve(update({...session?.user, name: input.name, email: input.email}))
          }, 3000))
      })
      .catch(() => setIsFailed(true));
  };

  return (
    <div className="d-sm-flex flex-column mb-4">
      {isSuccess && (
        <div className="alert alert-success" role="alert">
          Your profile has been update. Please wait a minute
        </div>
      )}
      {isFailed && (
        <div className="alert alert-danger" role="alert">
        Your profile failed to update
      </div>
      )}
      <h1 className="h3 mb-2 text-gray-800">Profile</h1>
      <div className="card shadow mb-4">
        <form onSubmit={submit}>
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Form edit</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="row mb-3 me-">
                <label
                  htmlFor="inputEmail3"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail3"
                    required
                    value={input.email}
                    onChange={(e) =>
                      setInput({ ...input, email: e.target.value })
                    }
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
                    onChange={(e) =>
                      setInput({ ...input, name: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer py-3">
            <button
              type="submit"
              className="btn btn-success btn-icon-split me-1"
            >
              <span className="icon text-white-50">
                <i className="fas fa-database"></i>
              </span>
              <span className="text">Update</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
