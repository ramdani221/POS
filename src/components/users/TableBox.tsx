import { Dispatch, SetStateAction, useState } from "react";
import Pagination from "./Pagination";
import TableList from "./TableList";
import TableControl from "./TableControl";
import Link from "next/link";

export default function TableBox() {
  const [filter, setFilter] = useState({ keyword: "", limit: 3 });
  const [pageNum, setPageNum] = useState(1);
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <Link href="/home/users/add" className="btn btn-primary btn-icon-split">
          <span className="icon text-white-50">
            <i className="fas fa-plus"></i>
          </span>
          <span className="text">Add</span>
        </Link>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <div
            id="dataTable_wrapper"
            className="dataTables_wrapper dt-bootstrap4"
          >
            <TableControl setFilter={setFilter} filter={filter} />
            <TableList filter={filter} pageNum={pageNum} />
            <Pagination pageNum={pageNum} setPageNum={setPageNum} />
          </div>
        </div>
      </div>
    </div>
  );
}
