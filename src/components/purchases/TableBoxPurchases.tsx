"use client";

import { useState } from "react";
import Pagination from "./Pagination";
import TableList from "./TableList";
import TableControl from "./TableControl";
import { useSession } from "next-auth/react";
import { useDispatch } from "@/lib/redux";
import { addPurchaseAsync } from "@/lib/redux/purchases/purchaseSlice";
import { useRouter } from "next/navigation";

export default function TableBoxPurchases() {
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
      addPurchaseAsync({
        totalsum: "0",
        operator: data?.user?.id,
        supplier: null,
      })
    )
      .then(({ payload }) => {
        route.push(`/home/purchases/edit/${payload.id}`);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  return (
    <>
      <div className={"alert alert-danger alert-dismissible fade position-absolute top-0 end-0 " +
        (isError && "show")} role="alert">
        <i className="fas fa-exclamation-triangle"></i>
        <span className="ms-2">Failed to add purchase, an error occurred when entering data</span>
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
            <div className="dataTables_wrapper dt-bootstrap4"
              id="dataTable_wrapper">
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
