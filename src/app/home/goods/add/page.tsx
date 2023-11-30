"use client";

import { request } from "@/lib/api";
import { useDispatch } from "@/lib/redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Edite() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [image, setImage] = useState()

  const [good, setGood] = useState({
    barcode: "",
    name: "",
    stock: "",
    purchaseprice: "",
    sellingprice: "",
    unit: "",
    picture: "",
  });

  const imageChange = (e: any) => {
    if(e.target.files && e.target.files.length > 0) setImage(e.target.files[0])
  }
  console.log(image)

  const submit = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData()
    formData.append('image', image)
    await request.post('/goods', {good,formData}, {
      headers : {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('jalan')
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Form add</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <div
            id="dataTable_wrapper"
            className="dataTables_wrapper dt-bootstrap4"
          >
            <form>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Barcode</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setGood({ ...good, barcode: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setGood({ ...good, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Stock</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setGood({ ...good, stock: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">
                  Purchase Price
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setGood({ ...good, purchaseprice: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Selling Price</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setGood({ ...good, sellingprice: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Unit</label>
                <div className="col-sm-9">
                  <select
                    className="form-select text-gray-700"
                    aria-label="Default select example"
                    onChange={(e) => setGood({...good, unit: e.target.value})}
                  >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Picture</label>
                <div className="col-sm-9">
                  <div className="mb-3">
                    {/* <label htmlFor="formFile" className="form-control d-flex justify-content-between align-items-center pe-0 overflow-hidden">
                      <span>Choose File</span> <span className="btn btn-light rounded-0 border-start">Browse...</span>
                    </label> */}
                    <input className="form-control pe-0" type="file" id="formFile" onChange={imageChange}/>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="card-footer py-3">
        <button
          className="btn btn-success btn-icon-split me-1"
          onClick={(e: any) => submit(e)}
        >
          <span className="icon text-white-50">
            <i className="fas fa-database"></i>
          </span>
          <span className="text">Save</span>
        </button>
        <Link href={"/home/units"} className="btn btn-warning btn-icon-split">
          <span className="icon text-white-50">
            <i className="fas fa-undo-alt"></i>
          </span>
          <span className="text">Back</span>
        </Link>
      </div>
    </div>
  );
}
