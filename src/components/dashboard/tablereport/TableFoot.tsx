import { useSelector } from "@/lib/redux";
import { selectTotSum } from "@/lib/redux/dashboard/dashboardSlice";
import { RpInd } from "@/services/currency";

export default function TableFoot() {
  const totsum = useSelector(selectTotSum);
  return (
    <tfoot>
      <tr>
        <th rowSpan={1} colSpan={1}>
          Total
        </th>
        <th rowSpan={1} colSpan={1}>
          {RpInd.format(totsum.totPurchase)}
        </th>
        <th rowSpan={1} colSpan={1}>
          {RpInd.format(totsum.totSelling)}
        </th>
        <th rowSpan={1} colSpan={1}>
          {RpInd.format(totsum.totSelling - totsum.totPurchase)}
        </th>
      </tr>
    </tfoot>
  );
}
