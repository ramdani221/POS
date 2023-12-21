"use client";

import TableData from "./TableData";
import TableFoot from "./TableFoot";
import TableHead from "./TableHead";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/lib/redux";
import { loadReportAsync, selectReport } from "@/lib/redux/dashboard/dashboardSlice";

export default function TableList({
  filter,
  pageNum,
  strDate, 
  endDate
}: {
  filter: { keyword: string; limit: number };
  pageNum: number;
  strDate: string;
  endDate: string
}) {
  const report = useSelector(selectReport);
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState({ 
    sort: true, 
    sortBy: "monthly" 
  });

  useEffect(() => {
    dispatch(
      loadReportAsync({
        ...filter,
        page: pageNum,
        sort: sorting.sort ? "asc" : "desc",
        sortBy: sorting.sortBy,
        endDate,
        strDate
      })
    );
  }, [dispatch, pageNum, filter, sorting, endDate, strDate]);

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <table
            className="table table-bordered dataTable text-gray-700"
            id="dataTable"
            width="100%"
            cellSpacing="0"
            role="grid"
            aria-describedby="dataTable_info"
            style={{ width: "100%" }}
          >
            <TableHead sorting={sorting} setSorting={setSorting} />
            <TableFoot />
            <tbody>
              {report.map((item) => (
                <TableData
                  item={item}
                  key={item.monthly}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
