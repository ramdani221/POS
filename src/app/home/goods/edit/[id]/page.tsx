"use client";

import { useDispatch } from "@/lib/redux";
import { fetchGetGood } from "@/lib/redux/goods/goodAPI";
import { updateGoodAsync } from "@/lib/redux/goods/goodSlice";
import { fetchLoadUnits } from "@/lib/redux/units/unitAPI";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edite() {
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [image, setImage] = useState();
  const [units, setUnits] = useState([{ id: "", unit: "" }]);

  const [good, setGood] = useState({
    barcode: "",
    name: "",
    stock: "",
    purchaseprice: "",
    sellingprice: "",
    unit: "",
    picture: "",
  });
console.log(good)
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0)
      setImage(e.target.files[0]);
  };

  useEffect(() => {
    fetchGetGood(id)
      .then(({ data }) => {
        setGood({
          barcode: data.barcode,
          name: data.name,
          stock: data.stock,
          purchaseprice: data.purchaseprice,
          sellingprice: data.sellingprice,
          unit: data.unit,
          picture: data.picture,
        });
      })
      .catch((err) => console.log(err));
      fetchLoadUnits({
        keyword: "",
        limit: "null",
        page: 1,
        sort: "asc",
        sortBy: "unit",
      }).then(({ data }) => {
        setUnits(data.units);
      });
  }, [id]);

  const submit = (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    formData.append("data", JSON.stringify(good));
    if (image) formData.append("image", image);
    dispatch(updateGoodAsync({ id: Number(id), input: formData }))
      .then(() => router.push("/home/goods"))
      .catch((err) => console.log(err));
  };

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
                  value={good.barcode}
                  required
                  onChange={(e) =>
                    setGood({ ...good, barcode: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={good.name}
                  required
                  onChange={(e) => setGood({ ...good, name: e.target.value })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Stock</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={good.stock}
                  required
                  onChange={(e) => setGood({ ...good, stock: e.target.value })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Purchase Price</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={good.purchaseprice}
                  required
                  onChange={(e) =>
                    setGood({ ...good, purchaseprice: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Selling Price</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={good.sellingprice}
                  required
                  onChange={(e) =>
                    setGood({ ...good, sellingprice: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Unit</label>
              <div className="col-sm-10">
                <select
                  className="form-select text-gray-700"
                  aria-label="Default select example"
                  value={good.unit}
                  required
                  onChange={(e) => setGood({ ...good, unit: e.target.value })}
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
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : `/imgGoods/${good.picture}`
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
