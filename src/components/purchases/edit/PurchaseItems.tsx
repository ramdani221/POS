import { useDispatch, useSelector } from "@/lib/redux";
import { addStock, loadGoodAsync, selectGoods } from "@/lib/redux/goods/goodSlice";
import { addPurchaseitem } from "@/lib/redux/purchaseItems/purchaseitemSlice";
import { RpInd } from "@/services/service";
import { useEffect, useState } from "react";

export default function PurchaseItems({ id }: { id: string }) {
  const goods = useSelector(selectGoods);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(0);
  const [index, setIndex] = useState(0);

  const total = qty * Number(goods[index]?.purchaseprice);

  const addItem = (e: Event) => {
    e.preventDefault();
    dispatch(
      addPurchaseitem({
        invoice: Number(id),
        itemcode: goods[index].id,
        quantity: qty,
        purchaseprice: goods[index].purchaseprice,
        totalprice: total.toString(),
      })
    );
    dispatch(addStock({ id: goods[index].id, qty: qty }));
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
            onChange={(e) => setIndex(Number(e.target.value))}
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
            Purchase price
          </label>
          <input
            type="text"
            className="form-control"
            id="purchasePrice"
            value={goods[index]?.purchaseprice}
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
            onChange={(e) => setQty(Number(e.target.value))}
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
            value={RpInd.format(total)}
          />
        </div>
      </div>
      <button
        className="btn btn-primary btn-icon-split"
        onClick={(e: any) => addItem(e)}
      >
        <span className="icon text-white-50">
          <i className="fas fa-plus"></i>
        </span>
        <span className="text">Add</span>
      </button>
    </div>
  );
}
