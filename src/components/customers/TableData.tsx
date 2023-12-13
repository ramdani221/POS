import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function TableData({
  customer,
  setId,
  setShow
}: {
  customer: CustomersType;
  setId: Dispatch<SetStateAction<number>>;
  setShow: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <tr className="odd/even">
      <td className="">{customer?.id}</td>
      <td className="">{customer?.name}</td>
      <td className="">{customer?.address}</td>
      <td className="">{customer?.phone}</td>
      <td>
        <Link href={`/home/customers/edit/${customer?.id}`} className="btn btn-success btn-circle me-1">
          <i className="fas fa-info-circle"></i>
        </Link>
        <button className="btn btn-danger btn-circle" onClick={() => {setId(customer?.id); setShow(true)}}>
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
