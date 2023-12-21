import { Dispatch, SetStateAction } from "react";

export default function TableHead({
  sorting,
  setSorting,
}: {
  sorting: { sort: boolean; sortBy: string };
  setSorting: Dispatch<SetStateAction<{ sort: boolean; sortBy: string }>>;
}) {

    const sortMonthly = () => {
        if(sorting.sortBy !== 'monthly') return setSorting({sort: true, sortBy: 'monthly'})
        return setSorting({...sorting, sort: !sorting.sort})
    }
    const sortExpense = () => {
        if(sorting.sortBy !== 'expense') return setSorting({sort: true, sortBy: 'expense'})
        return setSorting({...sorting, sort: !sorting.sort})
    }
    const sortRevenue = () => {
        if(sorting.sortBy !== 'revenue') return setSorting({sort: true, sortBy: 'revenue'})
        return setSorting({...sorting, sort: !sorting.sort})
    }
    const sortEarning = () => {
      if(sorting.sortBy !== 'earning') return setSorting({sort: true, sortBy: 'earning'})
      return setSorting({...sorting, sort: !sorting.sort})
  }

  return (
    <thead>
      <tr role="row">
        <th
          className={"sorting " + (sorting.sortBy === 'monthly'? sorting.sort?  "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "350px" }}
          onClick={() => sortMonthly()}
        >
          Monthly
        </th>
        <th
          className={"sorting " + (sorting.sortBy === 'expense'? sorting.sort?  "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "350px" }}
          onClick={() => sortExpense()}
        >
          Expense
        </th>
        <th
          className={"sorting " + (sorting.sortBy === 'revenue'? sorting.sort?  "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "300px" }}
          onClick={() => sortRevenue()}
        >
          Revenue
        </th>
        <th
          className={"sorting " + (sorting.sortBy === 'earning'? sorting.sort?  "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "350px" }}
          onClick={() => sortEarning()}
        >
          Earning
        </th>
      </tr>
    </thead>
  );
}
