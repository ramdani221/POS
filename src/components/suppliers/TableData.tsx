import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function TableData({
  supplier,
  setId,
  setShow
}: {
  supplier: SuppliersType;
  setId: Dispatch<SetStateAction<number>>;
  setShow: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <tr className="odd/even">
      <td className="">{supplier.id}</td>
      <td className="">{supplier.name}</td>
      <td className="">{supplier.address}</td>
      <td className="">{supplier.phone}</td>
      <td>
        <Link href={`/home/suppliers/edit/${supplier.id}`} className="btn btn-success btn-circle me-1">
          <i className="fas fa-info-circle"></i>
        </Link>
        <button className="btn btn-danger btn-circle" onClick={() => {setId(supplier.id); setShow(true)}}>
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
