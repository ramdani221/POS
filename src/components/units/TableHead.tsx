import { Dispatch, SetStateAction } from "react";

export default function TableHead({
  sorting,
  setSorting,
}: {
  sorting: { sort: boolean; sortBy: string };
  setSorting: Dispatch<SetStateAction<{ sort: boolean; sortBy: string }>>;
}) {

    const sortId = () => {
        if(sorting.sortBy !== 'id') return setSorting({sort: true, sortBy: 'id'})
        return setSorting({...sorting, sort: !sorting.sort})
    }
    const sortEmail = () => {
        if(sorting.sortBy !== 'email') return setSorting({sort: true, sortBy: 'email'})
        return setSorting({...sorting, sort: !sorting.sort})
    }
    const sortName = () => {
        if(sorting.sortBy !== 'name') return setSorting({sort: true, sortBy: 'name'})
        return setSorting({...sorting, sort: !sorting.sort})
    }
    const sortRole = () => {
        if(sorting.sortBy !== 'role') return setSorting({sort: true, sortBy: 'role'})
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
          style={{ width: "116px" }}
          onClick={() => sortId()}

        >
          User ID
        </th>
        <th
          className={"sorting " + (sorting.sortBy === 'email'? sorting.sort?  "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "450px" }}
          onClick={() => sortEmail()}
        >
          Email
        </th>
        <th
          className={"sorting " + (sorting.sortBy === 'name'? sorting.sort?  "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "303px" }}
          onClick={() => sortName()}
        >
          Name
        </th>
        <th
          className={"sorting " + (sorting.sortBy === 'role'? sorting.sort?  "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "224px" }}
          onClick={() => sortRole()}
        >
          Role
        </th>
        <th
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "213px" }}
        >
          Action
        </th>
      </tr>
    </thead>
  );
}
