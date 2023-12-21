"use client";

import DateSettings from "@/components/dashboard/DateSettings";
import TotalSum from "@/components/dashboard/TotalSum";
import ChartBox from "@/components/dashboard/chart/ChartBox";
import TableBoxReport from "@/components/dashboard/tablereport/TableBoxReport";
import { useDispatch } from "@/lib/redux";
import { loadDashboardAsync } from "@/lib/redux/dashboard/dashboardSlice";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [strDate, setStrDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    dispatch(
      loadDashboardAsync({
        keyword: "",
        endDate: "",
        strDate: "",
        limit: "3",
        page: 1,
        sort: "asc",
        sortBy: "monthly",
      })
    );
  }, [dispatch]);

  return (
    <>
      <DateSettings
        strDate={strDate}
        setStrDate={setStrDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <TotalSum />
      <ChartBox />
      <TableBoxReport strDate={strDate} endDate={endDate} />
    </>
  );
}
