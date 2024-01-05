import { useState } from "react";
import Pagination from "./Pagination";
import TableList from "./TableList";
import TableControl from "./TableControl";

export default function TableBoxReport({ strDate, endDate }: { strDate: string, endDate: string }) {
  const [filter, setFilter] = useState({ keyword: "", limit: 3 });
  const [pageNum, setPageNum] = useState(1);
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Date Settings</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
            <TableControl
              setFilter={setFilter}
              filter={filter}
              setPageNum={setPageNum}
            />
            <TableList
              filter={filter}
              pageNum={pageNum}
              strDate={strDate}
              endDate={endDate}
            />
            <Pagination pageNum={pageNum} setPageNum={setPageNum} />
          </div>
        </div>
      </div>
    </div>
  );
}
