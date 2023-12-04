import { Dispatch, SetStateAction } from "react";

export default function TableHead({
  sorting,
  setSorting,
}: {
  sorting: { sort: boolean; sortBy: string };
  setSorting: Dispatch<SetStateAction<{ sort: boolean; sortBy: string }>>;
}) {
  const sortBarcode = () => {
    if (sorting.sortBy !== "barcode")
      return setSorting({ sort: true, sortBy: "barcode" });
    return setSorting({ ...sorting, sort: !sorting.sort });
  };
  const sortName = () => {
    if (sorting.sortBy !== "name")
      return setSorting({ sort: true, sortBy: "name" });
    return setSorting({ ...sorting, sort: !sorting.sort });
  };
  const sortUnit = () => {
    if (sorting.sortBy !== "unit")
      return setSorting({ sort: true, sortBy: "unit" });
    return setSorting({ ...sorting, sort: !sorting.sort });
  };
  const sortStock = () => {
    if (sorting.sortBy !== "stock")
      return setSorting({ sort: true, sortBy: "stock" });
    return setSorting({ ...sorting, sort: !sorting.sort });
  };
  const sortPurchase = () => {
    if (sorting.sortBy !== "purchaseprice")
      return setSorting({ sort: true, sortBy: "purchaseprice" });
    return setSorting({ ...sorting, sort: !sorting.sort });
  };
  const sortSelling = () => {
    if (sorting.sortBy !== "sellingprice")
      return setSorting({ sort: true, sortBy: "sellingprice" });
    return setSorting({ ...sorting, sort: !sorting.sort });
  };

  return (
    <thead>
      <tr role="row">
        <th
          className={
            "sorting " +
            (sorting.sortBy === "barcode"
              ? sorting.sort
                ? "sorting_asc"
                : "sorting_desc"
              : "")
          }
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "450px" }}
          onClick={() => sortBarcode()}
        >
          Barcode
        </th>
        <th
          className={
            "sorting " +
            (sorting.sortBy === "name"
              ? sorting.sort
                ? "sorting_asc"
                : "sorting_desc"
              : "")
          }
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "450px" }}
          onClick={() => sortName()}
        >
          Name
        </th>
        <th
          className={
            "sorting " +
            (sorting.sortBy === "stock"
              ? sorting.sort
                ? "sorting_asc"
                : "sorting_desc"
              : "")
          }
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "150px" }}
          onClick={() => sortStock()}
        >
          Stock
        </th>
        <th
          className={
            "sorting " +
            (sorting.sortBy === "unit"
              ? sorting.sort
                ? "sorting_asc"
                : "sorting_desc"
              : "")
          }
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "150px" }}
          onClick={() => sortUnit()}
        >
          Unit
        </th>
        <th
          className={
            "sorting " +
            (sorting.sortBy === "purchaseprice"
              ? sorting.sort
                ? "sorting_asc"
                : "sorting_desc"
              : "")
          }
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "450px" }}
          onClick={() => sortPurchase()}
        >
          Purchase Price
        </th>
        <th
          className={
            "sorting " +
            (sorting.sortBy === "sellingprice"
              ? sorting.sort
                ? "sorting_asc"
                : "sorting_desc"
              : "")
          }
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "450px" }}
          onClick={() => sortSelling()}
        >
          Selling Price
        </th>
        <th
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "300px" }}
        >
          Picture
        </th>
        <th
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "300px" }}
        >
          Action
        </th>
      </tr>
    </thead>
  );
}
