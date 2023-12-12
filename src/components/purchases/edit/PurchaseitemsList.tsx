import { useDispatch, useSelector } from "@/lib/redux";
import { reduceStock } from "@/lib/redux/goods/goodSlice";
import {
  deletePurchaseItem,
  loadPurchaseitemAsync,
  selectPurchaseitems,
} from "@/lib/redux/purchaseItems/purchaseitemSlice";
import { RpInd } from "@/services/service";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function PurchaseitemsList({
  id,
  setTotalSum,
}: {
  id: string;
  setTotalSum: Dispatch<SetStateAction<string>>;
}) {
  const purchaseitems = useSelector(selectPurchaseitems);
  const dispatch = useDispatch();

  const deleteItem = (
    e: any,
    itemId: number,
    itemcode: number,
    qty: number
  ) => {
    dispatch(deletePurchaseItem(itemId));
    dispatch(reduceStock({ id: itemcode, qty }));
  };

  useEffect(() => {
    let totalsum = 0
    purchaseitems.forEach(item => totalsum += Number(item.totalprice))
    
    setTotalSum(totalsum.toString());
  }, [setTotalSum, purchaseitems]);

  useEffect(() => {
    dispatch(loadPurchaseitemAsync(id));
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
          {purchaseitems.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center">
                no items
              </td>
            </tr>
          )}
          {purchaseitems.length > 0 &&
            purchaseitems.map((item, index) => (
              <tr key={item?.id}>
                <td>{index + 1}</td>
                <td>{item?.Good.barcode}</td>
                <td>{item?.Good.name}</td>
                <td>{item?.quantity}</td>
                <td>{RpInd.format(item?.purchaseprice)}</td>
                <td>{RpInd.format(item?.totalprice)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-circle"
                    onClick={(e) =>
                      deleteItem(e, item.id, item.itemcode, item.quantity)
                    }
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
