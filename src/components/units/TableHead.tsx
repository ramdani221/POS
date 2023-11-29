import { Dispatch, SetStateAction } from "react";

export default function TableHead({
  sorting,
  setSorting,
}: {
  sorting: { sort: boolean; sortBy: string };
  setSorting: Dispatch<SetStateAction<{ sort: boolean; sortBy: string }>>;
}) {

    const sortNote = () => {
        if(sorting.sortBy !== 'note') return setSorting({sort: true, sortBy: 'note'})
        return setSorting({...sorting, sort: !sorting.sort})
    }
    const sortName = () => {
        if(sorting.sortBy !== 'name') return setSorting({sort: true, sortBy: 'name'})
        return setSorting({...sorting, sort: !sorting.sort})
    }
    const sortUnit = () => {
        if(sorting.sortBy !== 'unit') return setSorting({sort: true, sortBy: 'unit'})
        return setSorting({...sorting, sort: !sorting.sort})
    }

  return (
    <thead>
      <tr role="row">
        <th
          className={"sorting " + (sorting.sortBy === 'unit'? sorting.sort?  "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "224px" }}
          onClick={() => sortUnit()}
        >
          Unit
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
          className={"sorting " + (sorting.sortBy === 'note'? sorting.sort?  "sorting_asc" : "sorting_desc" : "")}
          tabIndex={0}
          aria-controls="dataTable"
          rowSpan={1}
          colSpan={1}
          style={{ width: "450px" }}
          onClick={() => sortNote()}
        >
          note
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
