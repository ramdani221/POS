import { Dispatch, SetStateAction } from "react";

export default function TableControl({
  setFilter, filter
}: {
  setFilter: Dispatch<
    SetStateAction<{
      keyword: string;
      limit: number;
    }>
  >,
  filter: {keyword: string, limit: number}
}) {
  return (
    <div className="row">
      <div className="col-sm-12 col-md-6">
        <div className="dataTables_length " id="dataTable_length">
          <label>
            Show{" "}
            <select
              name="dataTable_length"
              aria-controls="dataTable"
              className="custom-select custom-select-sm form-control form-control-sm"
              onChange={(e: any) => setFilter({...filter, limit: e.target.value}) }
            >
              <option value={3}>3</option>
              <option value={10}>10</option>
              <option value={100}>100</option>
            </select>{" "}
            entries
          </label>
        </div>
      </div>
      <div className="col-sm-12 col-md-6">
        <div id="dataTable_filter" className="dataTables_filter">
          <label>
            Search:
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder=""
              aria-controls="dataTable"
              onChange={(e: any) => setFilter({...filter, keyword: e.target.value})}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
