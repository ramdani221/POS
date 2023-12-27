"use client";

import { useState } from "react";
import Pagination from "./Pagination";
import TableList from "./TableList";
import TableControl from "./TableControl";
import { useSession } from "next-auth/react";
import { useDispatch } from "@/lib/redux";
import { useRouter } from "next/navigation";
import { addSaleAsync } from "@/lib/redux/sales/saleSlice";

export default function TableBoxSales() {
  const { data }: { data: any } = useSession();
  const [filter, setFilter] = useState({ 
    keyword: "", 
    limit: 3 
  });
  const [pageNum, setPageNum] = useState(1);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const route = useRouter();

  const create = () => {
    dispatch(
      addSaleAsync({
        totalsum: "0.00",
        operator: data?.user?.id,
        customer: null,
        change: '0.00',
        pay: '0.00'
      })
    )
      .then(({ payload }) => {
        route.push(`/home/sales/edit/${payload.id}`);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  return (
    <>
      <div
        className={
          "alert alert-danger alert-dismissible fade position-absolute top-0 end-0 " + (isError && "show")
        }
        role="alert"
      >
        <i className="fas fa-exclamation-triangle"></i>
        <span className="ms-2">Failed to add sale, an error occurred when entering data</span>
        <button
          type="button"
          className="btn-close"
          onClick={() => setIsError(false)}
        ></button>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <button
            className="btn btn-primary btn-icon-split"
            onClick={() => create()}
          >
            <span className="icon text-white-50">
              <i className="fas fa-plus"></i>
            </span>
            <span className="text">Add</span>
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <TableControl
                setFilter={setFilter}
                filter={filter}
                setPageNum={setPageNum}
              />
              <TableList filter={filter} pageNum={pageNum} />
              <Pagination pageNum={pageNum} setPageNum={setPageNum} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
