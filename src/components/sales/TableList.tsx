"use client";

import TableData from "./TableData";
import TableFoot from "./TableFoot";
import TableHead from "./TableHead";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/lib/redux";
import { loadSaleAsync, selectSales } from "@/lib/redux/sales/saleSlice";
import SaleModal from "./SaleModal";

export default function TableList({
  filter,
  pageNum,
}: {
  filter: { keyword: string; limit: number };
  pageNum: number;
}) {
  const sales = useSelector(selectSales);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [sorting, setSorting] = useState({ 
    sort: false, 
    sortBy: "invoice" 
  });

  useEffect(() => {
    dispatch(
      loadSaleAsync({
        ...filter,
        page: pageNum,
        sort: sorting.sort ? "asc" : "desc",
        sortBy: sorting.sortBy,
      })
    );
  }, [dispatch, pageNum, filter, sorting]);

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
              {sales.map((sale) => (
                <TableData
                  sale={sale}
                  setId={setId}
                  setShow={setShow}
                  key={sale.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {show && (
        <SaleModal
          id={id}
          setShow={setShow}
          input={{
            ...filter,
            page: pageNum,
            sort: sorting.sort ? "asc" : "desc",
            sortBy: sorting.sortBy,
          }}
        />
      )}
    </>
  );
}
