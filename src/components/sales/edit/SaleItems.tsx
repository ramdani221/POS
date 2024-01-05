import { SocketContext } from "@/app/home/layout";
import { useDispatch, useSelector } from "@/lib/redux";
import { loadGoodAsync, reduceStock, selectGoods } from "@/lib/redux/goods/goodSlice";
import { addNotifAsync } from "@/lib/redux/notif/notifSlice";
import { addSaleitem } from "@/lib/redux/saleitems/saleitemSlice";
import { RpInd } from "@/services/currency";
import { useContext, useEffect, useState } from "react";

export default function SaleItems({ id }: { id: string }) {
  const goods = useSelector(selectGoods);
  const dispatch = useDispatch();
  const [qty, setQty] = useState("0");
  const [index, setIndex] = useState(0);
  const socket = useContext(SocketContext);

  const total = Number(qty) * Number(goods[index]?.purchaseprice);

  const setItem = (num: number) => {
    setIndex(num);
    setQty("0");
  };

  const addItem = (e: Event) => {
    e.preventDefault();
    new Promise((resolve) => {
      resolve(
        dispatch(
          addSaleitem({
            invoice: Number(id),
            itemcode: goods[index].id,
            quantity: Number(qty),
            sellingprice: goods[index].sellingprice,
            totalprice: total.toString(),
          })
        )
      );
    }).then(() => {
      if ((goods[index].stock - Number(qty)) <= 5) {
        new Promise(resolve => {
          resolve(
            dispatch(
              addNotifAsync({
                barcode: goods[index].barcode,
                name: goods[index].name,
                stock: goods[index].stock - Number(qty)
              })
            )
          )
        }).then(() => {
          socket.emit("send_notif", "send")
        }).catch(err => { })
      }
      dispatch(reduceStock({ id: goods[index].id, qty: Number(qty) }))
    }).catch(err => { })
  };

  useEffect(() => {
    dispatch(
      loadGoodAsync({
        keyword: "",
        limit: "null",
        page: 1,
        sort: "asc",
        sortBy: "barcode",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (Number(qty) > goods[index]?.stock)
      setQty(goods[index]?.stock.toString());
    if (Number(qty) < 0) setQty("0");
  }, [index, qty, goods]);

  return (
    <div className="card-body border-bottom pb-5 pt-5">
      <div className="row">
        <div className="col-sm-4">
          <label htmlFor="goodsBarcode" className="form-label">
            Goods Barcode
          </label>
          <select
            className="form-select text-gray-700"
            aria-label="Default select example"
            required
            onChange={(e) => setItem(Number(e.target.value))}
          >
            {goods.map((good, index) => (
              <option value={index} key={good?.id}>
                {good?.barcode}-{good?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-4 mb-3">
          <label htmlFor="goodsName" className="form-label">
            Goods Name
          </label>
          <input
            type="text"
            className="form-control"
            id="goodsName"
            value={goods[index]?.name}
            disabled
          />
        </div>
        <div className="col-sm-4">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="text"
            className="form-control"
            id="stock"
            value={goods[index]?.stock}
            disabled
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          <label htmlFor="purchasePrice" className="form-label">
            Selling price
          </label>
          <input
            type="text"
            className="form-control"
            id="purchasePrice"
            value={goods[index]?.sellingprice}
            disabled
          />
        </div>
        <div className="col-sm-4">
          <label htmlFor="qty" className="form-label">
            Qty
          </label>
          <input
            type="number"
            className="form-control"
            id="qty"
            value={qty}
            min={0}
            max={goods[index]?.stock}
            disabled={goods[index]?.stock === 0}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>
        <div className="col-sm-4">
          <label htmlFor="totalPrice" className="form-label">
            Total Price
          </label>
          <input
            type="text"
            className="form-control"
            id="totalPrice"
            disabled
            value={RpInd.format(total)}
          />
        </div>
      </div>
      <button className="btn btn-primary btn-icon-split"
        onClick={(e: any) => addItem(e)}>
        <span className="icon text-white-50">
          <i className="fas fa-plus"></i>
        </span>
        <span className="text">Add</span>
      </button>
    </div>
  );
}
