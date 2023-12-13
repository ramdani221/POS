import { Dispatch, SetStateAction } from "react";

export default function TableHead({
  sorting,
  setSorting,
}: {
  sorting: { sort: boolean; sortBy: string };
  setSorting: Dispatch<SetStateAction<{ sort: boolean; sortBy: string }>>;
}) {

    const sortAddress = () => {
        if(sorting.sortBy !== 'address') return setSorting({sort: true, sortBy: 'address'})
        return setSorting({...sorting, sort: !sorting.sort})
    }
    const sortName = () => {
        if(sorting.sortBy !== 'name') return setSorting({sort: true, sortBy: 'name'})
        return setSorting({...sorting, sort: !sorting.sort})
    }
    const sortId = () => {
        if(sorting.sortBy !== 'id') return setSorting({sort: true, sortBy: 'id'})
        return setSorting({...sorting, sort: !sorting.sort})
    }
    const sortPhone = () => {
      if(sorting.sortBy !== 'phone') return setSorting({sort: true, sortBy: 'phone'})
      return setSorting({...sorting, sort: !sorting.sort})
  }

  return (
    <thead>
      <tr role="row">
        <th
          className={"sorting " + (sorting.sortBy === 'id'? sorting.sort?  "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "350px" }}
          onClick={() => sortId()}
        >
          Customer ID
        </th>
        <th
          className={"sorting " + (sorting.sortBy === 'name'? sorting.sort?  "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "350px" }}
          onClick={() => sortName()}
        >
          Name
        </th>
        <th
          className={"sorting " + (sorting.sortBy === 'address'? sorting.sort?  "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "300px" }}
          onClick={() => sortAddress()}
        >
          Address
        </th>
        <th
          className={"sorting " + (sorting.sortBy === 'phone'? sorting.sort?  "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "350px" }}
          onClick={() => sortPhone()}
        >
          Phone
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
