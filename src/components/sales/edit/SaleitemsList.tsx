import { SocketContext } from "@/app/home/layout";
import { useDispatch, useSelector } from "@/lib/redux";
import { addStock } from "@/lib/redux/goods/goodSlice";
import { deleteSaleItem, loadSaleitemAsync, selectSaleitems } from "@/lib/redux/saleitems/saleitemSlice";
import { RpInd } from "@/services/currency";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";

export default function SaleitemsList({
  id,
  setTotalSum,
}: {
  id: string;
  setTotalSum: Dispatch<SetStateAction<string>>;
}) {
  const saleitems = useSelector(selectSaleitems);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext)

  const deleteItem = (
    e: any,
    itemId: number,
    itemcode: number,
    qty: number
  ) => {
    dispatch(deleteSaleItem(itemId));
    dispatch(addStock({ id: itemcode, qty }));
  };

  useEffect(() => {
    let totalsum = 0;
    saleitems.forEach((item) => (totalsum += Number(item.totalprice)));
    setTotalSum(totalsum.toString());
  }, [setTotalSum, saleitems]);

  useEffect(() => {
    dispatch(loadSaleitemAsync(id));
  }, [dispatch, id]);

  return (
    <div className="card-body px-0 overflow-x-auto">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>No.</th>
            <th>barcode</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {saleitems.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center">no items</td>
            </tr>
          )}
          {saleitems.length > 0 &&
            saleitems.map((item, index) => (
              <tr key={item?.id}>
                <td>{index + 1}</td>
                <td>{item?.Good.barcode}</td>
                <td>{item?.Good.name}</td>
                <td>{item?.quantity}</td>
                <td>{RpInd.format(item?.sellingprice)}</td>
                <td>{RpInd.format(item?.totalprice)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-circle"
                    onClick={(e) => deleteItem(
                      e, item.id,
                      item.itemcode,
                      item.quantity
                    )}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
