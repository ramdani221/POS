"use client";

import { useDispatch } from "@/lib/redux";
import { fetchChangePassword } from "@/lib/redux/users/userAPI";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Edite() {
  const { data: session, update }: { data: any; update: any } = useSession();
  const id = session?.user?.id;
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const [input, setInput] = useState({
    id,
    oldPassword: "",
    newPassword: "",
    rePassword: "",
  });

  const submit = async (e: any) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsFailed(false);
    try {
      const data = await fetchChangePassword(input);
      setIsSuccess(true);
    } catch (error) {
      setErrMessage(error as string);
      setIsFailed(true);
    }
  };

  return (
    <div className="d-sm-flex flex-column mb-4">
      {isSuccess && (
        <div className="alert alert-success" role="alert">
          Your profile has been update
        </div>
      )}
      {isFailed && (
        <div className="alert alert-danger" role="alert">
          {errMessage}
        </div>
      )}
      <h1 className="h3 mb-2 text-gray-800">Profile</h1>
      <div className="card shadow mb-4">
        <form onSubmit={submit}>
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Form edit
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="row mb-3 me-">
                <label htmlFor="inputPassword3"
                  className="col-sm-2 col-form-label">
                  Old Password
                </label>
                <div className="col-sm-10">
                  <input type="password" className="form-control"
                    id="inputPassowrd3" required value={input.oldPassword}
                    onChange={(e) =>
                      setInput({ ...input, oldPassword: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">
                  New Password
                </label>
                <div className="col-sm-10">
                  <input type="password" className="form-control"
                    required value={input.newPassword}
                    onChange={(e) =>
                      setInput({ ...input, newPassword: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">
                  Retype Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={input.rePassword}
                    onChange={(e) =>
                      setInput({ ...input, rePassword: e.target.value })
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
              <span className="text">Update</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
