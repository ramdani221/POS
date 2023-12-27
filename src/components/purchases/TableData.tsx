
import { RpInd } from "@/services/currency";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function TableData({
  purchase,
  setId,
  setShow
}: {
  purchase: PurchasesType;
  setId: Dispatch<SetStateAction<number>>;
  setShow: Dispatch<SetStateAction<boolean>>
}) {
  const {data} : {data: any} = useSession()
  return (
    <tr className="odd/even disabled">
      <td className="">{purchase?.invoice}</td>
      <td className="">{moment(purchase?.createdAt).format('DD MMM YYYY HH:mm:ss')}</td>
      <td className="">{RpInd.format(purchase?.totalsum)}</td>
      <td className="">{purchase?.Supplier?.name}</td>
      <td>
        <Link href={`/home/purchases/edit/${purchase?.id}`} className={"btn btn-success btn-circle me-1 " + (data.user.id === purchase.operator? '' : 'disabled')}>
          <i className="fas fa-info-circle"></i>
        </Link>
        <button className={"btn btn-danger btn-circle me-1 " + (data.user.id === purchase.operator? '' : 'disabled')} onClick={() => {setId(purchase?.id); setShow(true)}}>
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
