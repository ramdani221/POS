import { Dispatch, SetStateAction } from "react";

export default function TableHead({
  sorting,
  setSorting,
}: {
  sorting: { sort: boolean; sortBy: string };
  setSorting: Dispatch<SetStateAction<{ sort: boolean; sortBy: string }>>;
}) {
  const sortInvoice = () => {
    if (sorting.sortBy !== "invoice")
      return setSorting({ sort: true, sortBy: "invoice" });
    return setSorting({ ...sorting, sort: !sorting.sort });
  };
  const sortTime = () => {
    if (sorting.sortBy !== "createdAt")
      return setSorting({ sort: true, sortBy: "createdAt" });
    return setSorting({ ...sorting, sort: !sorting.sort });
  };
  const sortTotal = () => {
    if (sorting.sortBy !== "totalsum")
      return setSorting({ sort: true, sortBy: "totalsum" });
    return setSorting({ ...sorting, sort: !sorting.sort });
  };
  const sortPay = () => {
    if (sorting.sortBy !== "pay")
      return setSorting({ sort: true, sortBy: "pay" });
    return setSorting({ ...sorting, sort: !sorting.sort });
  };
  const sortChange = () => {
    if (sorting.sortBy !== "change")
      return setSorting({ sort: true, sortBy: "change" });
    return setSorting({ ...sorting, sort: !sorting.sort });
  };
  const sortCustomer = () => {
    if (sorting.sortBy !== "customer")
      return setSorting({ sort: true, sortBy: "customer" });
    return setSorting({ ...sorting, sort: !sorting.sort });
  }

  return (
    <thead>
      <tr role="row">
        <th
          className={"sorting " + (sorting.sortBy === "invoice" ?
            sorting.sort ? "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "350px" }}
          onClick={() => sortInvoice()}
        >
          Invoice
        </th>
        <th
          className={"sorting " + (sorting.sortBy === "createdAt" ?
            sorting.sort ? "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "450px" }}
          onClick={() => sortTime()}
        >
          Time
        </th>
        <th
          className={"sorting " + (sorting.sortBy === "totalsum" ?
            sorting.sort ? "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "400px" }}
          onClick={() => sortTotal()}
        >
          Total Summary
        </th>
        <th
          className={"sorting " + (sorting.sortBy === "pay" ?
            sorting.sort ? "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "400px" }}
          onClick={() => sortPay()}
        >
          Pay
        </th>
        <th
          className={"sorting " + (sorting.sortBy === "change" ?
            sorting.sort ? "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "400px" }}
          onClick={() => sortChange()}
        >
          Change
        </th>
        <th
          className={"sorting " + (sorting.sortBy === "supplier" ?
            sorting.sort ? "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "300px" }}
          onClick={() => sortCustomer()}
        >
          Customer
        </th>
        <th
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "250px" }}
        >
          Action
        </th>
      </tr>
    </thead>
  );
}
