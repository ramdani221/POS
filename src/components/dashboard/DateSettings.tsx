import { useDispatch } from "@/lib/redux";
import { loadDashboardAsync } from "@/lib/redux/dashboard/dashboardSlice";
import { Dispatch, SetStateAction, useState } from "react";

export default function DateSettings({
  strDate,
  setStrDate,
  endDate,
  setEndDate,
}: {
  strDate: string;
  setStrDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
}) {
  const dispatch = useDispatch();

  const submit = (e: any) => {
    e.preventDefault();
    dispatch(
      loadDashboardAsync({
        keyword: "",
        endDate: endDate,
        strDate: strDate,
        limit: "3",
        page: 1,
        sort: "asc",
        sortBy: "monthly",
      })
    );
  };
  return (
    <div className="card shadow mb-4">
      <form onSubmit={submit}>
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Date Settings</h6>
        </div>
        <div className="card-body row">
          <div className="col-sm-6">
            <label htmlFor="strDate" className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="strDate"
              value={strDate}
              onChange={(e) => setStrDate(e.target.value)}
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="card-footer py-3">
          <button type="submit" className="btn btn-success btn-icon-split me-1">
            <span className="icon text-white-50">
              <i className="fas fa-check"></i>
            </span>
            <span className="text">Save</span>
          </button>
          <button
            className="btn btn-warning btn-icon-split"
            onClick={() => {
              setEndDate("");
              setStrDate("");
            }}
          >
            <span className="icon text-white-50">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span className="text">Back</span>
          </button>
        </div>
      </form>
    </div>
  );
}
