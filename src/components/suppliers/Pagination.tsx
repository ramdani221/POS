import { useSelector } from "@/lib/redux";
import PageNum from "./PageNum";
import { Dispatch, SetStateAction } from "react";
import { suppliersPagination } from "@/lib/redux/suppliers/supplierSlice";

export default function Pagination({
  pageNum,
  setPageNum,
}: {
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
}) {
  const { page, limit, offset, pages, total } = useSelector(suppliersPagination);
  const rows = [];
  for (let i = 1; i <= pages; i++) {
    rows.push(i);
  }
  return (
    <div className="row">
      <div className="col-sm-12 col-md-5">
        <div
          className="dataTables_info"
          id="dataTable_info"
          role="status"
          aria-live="polite"
        >
          {offset < total ? `Showing ${offset + 1} to ` +
            (limit + offset > total ? total : limit + offset) +
            ` of ${total} entries` : "Nothing to show"}
        </div>
      </div>
      <div className="col-sm-12 col-md-7">
        <div className="dataTables_paginate paging_simple_numbers"
          id="dataTable_paginate">
          <ul className="pagination">
            <li className={"paginate_button page-item previous " + (page === 1 && "disabled")}
              id="dataTable_previous">
              <button
                aria-controls="dataTable"
                data-dt-idx="0"
                tabIndex={0}
                className="page-link"
                onClick={() => setPageNum(pageNum - 1)}
              >
                Previous
              </button>
            </li>
            {rows.map((row) => (
              <PageNum
                page={row}
                pageNow={page}
                key={row}
                setPageNum={setPageNum}
              />
            ))}
            <li className={"paginate_button page-item next " + (page >= pages && "disabled")}
              id="dataTable_next">
              <button
                aria-controls="dataTable"
                data-dt-idx="7"
                tabIndex={0}
                className="page-link"
                onClick={() => setPageNum(pageNum + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
