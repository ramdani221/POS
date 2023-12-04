import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function TableData({
  unit,
  setId,
  setShow
}: {
  unit: UnitsType;
  setId: Dispatch<SetStateAction<number>>;
  setShow: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <tr className="odd/even">
      <td className="">{unit.unit}</td>
      <td className="">{unit.name}</td>
      <td className="">{unit.note}</td>
      <td>
        <Link href={`/home/units/edit/${unit.id}`} className="btn btn-success btn-circle me-1">
          <i className="fas fa-info-circle"></i>
        </Link>
        <button className="btn btn-danger btn-circle" onClick={() => {setId(unit.id); setShow(true)}}>
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
