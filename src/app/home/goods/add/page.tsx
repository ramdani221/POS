"use client";

import { useDispatch, useSelector } from "@/lib/redux";
import { addGoodAsync } from "@/lib/redux/goods/goodSlice";
import { loadUnitAsync, selectUnits } from "@/lib/redux/units/unitSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edite() {
  const units = useSelector(selectUnits);
  const dispatch = useDispatch();
  const router = useRouter();
  const [image, setImage] = useState();

  const [good, setGood] = useState({
    barcode: "",
    name: "",
    stock: "",
    purchaseprice: "",
    sellingprice: "",
    unit: 0,
  });

  useEffect(() => {
    dispatch(
      loadUnitAsync({
        keyword: "",
        limit: "null",
        page: 1,
        sort: "asc",
        sortBy: "unit",
      })
    );
  }, [dispatch]);


  useEffect(() => {
    setGood(g => ({...g, unit: units[0].id}))
  }, [units])

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0)
      setImage(e.target.files[0]);
  };

  const submit = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(good));
    dispatch(addGoodAsync(formData));
    router.push("/home/goods");
  };

  return (
    <div className="card shadow mb-4">
      <form onSubmit={submit}>
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Form add</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Barcode</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
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
                  onChange={(e) => setGood({...good, unit: Number(e.target.value)})}
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
                <div className="mb-3">
                  <input
                    className="form-control pe-0"
                    type="file"
                    id="formFile"
                    onChange={imageChange}
                    required
                  />
                </div>
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
