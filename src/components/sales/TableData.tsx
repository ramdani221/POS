
import { RpInd } from "@/services/currency";
import moment from "moment";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function TableData({
  sale,
  setId,
  setShow
}: {
  sale: SalesType;
  setId: Dispatch<SetStateAction<number>>;
  setShow: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <tr className="odd/even">
      <td className="">{sale?.invoice}</td>
      <td className="">{moment(sale?.createdAt).format('DD MMM YYYY HH:mm:ss')}</td>
      <td className="">{RpInd.format(sale?.totalsum)}</td>
      <td className="">{RpInd.format(sale?.pay)}</td>
      <td className="">{RpInd.format(sale?.change)}</td>
      <td className="">{sale?.Customer?.name}</td>
      <td>
        <Link href={`/home/sales/edit/${sale?.id}`} className="btn btn-success btn-circle me-1">
          <i className="fas fa-info-circle"></i>
        </Link>
        <button className="btn btn-danger btn-circle" onClick={() => {setId(sale?.id); setShow(true)}}>
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
