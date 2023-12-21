import { RpInd } from "@/services/currency";

export default function TableData({ item }: { item: ReportType }) {
  return (
    <tr className="odd/even">
      <td className="">{item?.name}</td>
      <td className="">{RpInd.format(item?.expense)}</td>
      <td className="">{RpInd.format(item?.revenue)}</td>
      <td className="">{RpInd.format(item?.earning)}</td>
    </tr>
  );
}
