import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function TableData({
  good,
  setId,
  setShow
}: {
  good: GoodsType;
  setId: Dispatch<SetStateAction<number>>;
  setShow: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <tr className="odd/even">
      <td className="">{good.barcode}</td>
      <td className="">{good.name}</td>
      <td className="">{good.stock}</td>
      <td className="">{good.Unit.unit}</td>
      <td className="">{good.purchaseprice}</td>
      <td className="">{good.sellingprice}</td>
      <td className=""><Image className="object-fit-contain" src={`/imgGoods/${good.picture}`} alt={good.name} width={500} height={500} style={{width: '100%', height: '100%', objectFit: 'scale-down'}}/></td>
      <td>
        <Link href={`/home/goods/edit/${good.id}`} className="btn btn-success btn-circle me-1">
          <i className="fas fa-info-circle"></i>
        </Link>
        <button className="btn btn-danger btn-circle" onClick={() => {setId(good.id); setShow(true)}}>
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
