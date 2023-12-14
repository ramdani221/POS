"use client";

import SaleData from "@/components/sales/edit/SaleData";
import SaleFooter from "@/components/sales/edit/SaleFooter";
import SaleItems from "@/components/sales/edit/SaleItems";
import SaleitemsList from "@/components/sales/edit/SaleitemsList";
import { useDispatch, useSelector } from "@/lib/redux";
import { getSale, getSaleAsync } from "@/lib/redux/sales/saleSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edite() {
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const sale = useSelector(getSale);
  const [totalSum, setTotalSum] = useState('0.00')

  useEffect(() => {
    dispatch(getSaleAsync(Number(id)));
  }, [dispatch, id]);

  return (
    <div className="card shadow mb-4">
      <form>
        <div className="card-header py-3">
          <h1 className="m-0 text-gray-700">Transaction</h1>
        </div>
        <SaleData sale={sale} />
        <SaleItems id={id} />
        <SaleitemsList id={id} setTotalSum={setTotalSum} />
        <SaleFooter id={id} sale={sale} totalSum={totalSum}/>        
      </form>
    </div>
  );
}
