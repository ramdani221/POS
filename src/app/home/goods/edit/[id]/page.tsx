"use client";

import { SocketContext } from "@/app/home/layout";
import { useDispatch, useSelector } from "@/lib/redux";
import { getGood, getGoodAsync, updateGoodAsync } from "@/lib/redux/goods/goodSlice";
import { addNotifAsync } from "@/lib/redux/notif/notifSlice";
import { loadUnitAsync, selectUnits } from "@/lib/redux/units/unitSlice";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Edite() {
  const { id }: { id: string } = useParams();
  const good = useSelector(getGood);
  const units = useSelector(selectUnits);
  const dispatch = useDispatch();
  const router = useRouter();
  const [image, setImage] = useState();
  const socket = useContext(SocketContext);

  const [input, setInput] = useState({
    barcode: "",
    name: "",
    stock: 0,
    purchaseprice: "",
    sellingprice: "",
    unit: 0,
    picture: "",
  });

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0)
      setImage(e.target.files[0]);
  };

  const submit = (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    formData.append("data", JSON.stringify(input));
    if (image) formData.append("image", image);
    dispatch(
      updateGoodAsync({
        id: Number(id),
        input: formData
      })
    ).then(() => {
      if (input.stock <= 5) {
        dispatch(
          addNotifAsync({
            barcode: input.barcode,
            name: input.name,
            stock: input.stock
          })
        ).then(() => {
          socket.emit("send_notif", "send")
        }).catch(err => { })
      }
      router.push("/home/goods")
    }).catch(err => { })
  };

  useEffect(() => {
    dispatch(getGoodAsync(Number(id)));
    dispatch(
      loadUnitAsync({
        keyword: "",
        limit: "null",
        page: 1,
        sort: "asc",
        sortBy: "unit",
      })
    );
  }, [dispatch, id]);

  useEffect(() => {
    setInput({
      barcode: good.barcode,
      name: good.name,
      stock: good.stock,
      purchaseprice: good.purchaseprice,
      sellingprice: good.sellingprice,
      unit: good.unit,
      picture: good.picture,
    })
  }, [good])

  return (
    <div className="card shadow mb-4">
      <form onSubmit={submit}>
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Form edit</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Barcode</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={input.barcode}
                  required
                  onChange={(e) =>
                    setInput({
                      ...input,
                      barcode: e.target.value
                    })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={input.name}
                  required
                  onChange={(e) => setInput({
                    ...input,
                    name: e.target.value
                  })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Stock</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={input.stock}
                  required
                  onChange={(e) => setInput({
                    ...input,
                    stock: Number(e.target.value)
                  })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Purchase Price</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={input.purchaseprice}
                  required
                  onChange={(e) =>
                    setInput({
                      ...input,
                      purchaseprice: e.target.value
                    })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Selling Price</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={input.sellingprice}
                  required
                  onChange={(e) =>
                    setInput({
                      ...input,
                      sellingprice: e.target.value
                    })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Unit</label>
              <div className="col-sm-10">
                <select
                  className="form-select text-gray-700"
                  aria-label="Default select example"
                  value={input.unit}
                  required
                  onChange={(e) => setInput({
                    ...input,
                    unit: Number(e.target.value)
                  })}
                >
                  {units.map((unit) => (
                    <option value={unit.id} key={unit.id}>
                      {unit.unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Picture</label>
              <div className="col-sm-10">
                <input
                  className="form-control pe-0"
                  type="file"
                  id="formFile"
                  onChange={imageChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Preview</label>
              <div className="col-sm-10">
                <Image
                  className="form-control h-auto w-75"
                  src={image ?
                    URL.createObjectURL(image) :
                    `/imgGoods/${input.picture}`
                  }
                  alt="good image"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer py-3">
          <button type="submit" className="btn btn-success btn-icon-split me-1">
            <span className="icon text-white-50">
              <i className="fas fa-database"></i>
            </span>
            <span className="text">Save</span>
          </button>
          <Link href={"/home/goods"} className="btn btn-warning btn-icon-split">
            <span className="icon text-white-50">
              <i className="fas fa-undo-alt"></i>
            </span>
            <span className="text">Back</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
