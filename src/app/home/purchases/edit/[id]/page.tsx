"use client";

import PurchaseData from "@/components/purchases/edit/PurchaseData";
import PurchaseFooter from "@/components/purchases/edit/PurchaseFooter";
import PurchaseItems from "@/components/purchases/edit/PurchaseItems";
import PurchaseitemsList from "@/components/purchases/edit/PurchaseitemsList";
import { useDispatch, useSelector } from "@/lib/redux";
import { getPurchase, getPurchaseAsync } from "@/lib/redux/purchases/purchaseSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edite() {
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const purchase = useSelector(getPurchase);
  const [totalSum, setTotalSum] = useState('0.00')

  useEffect(() => {
    dispatch(getPurchaseAsync(Number(id)));
  }, [dispatch, id]);

  return (
    <div className="card shadow mb-4">
      <form>
        <div className="card-header py-3">
          <h1 className="m-0 text-gray-700">Transaction</h1>
        </div>
        <PurchaseData purchase={purchase} />
        <PurchaseItems id={id} />
        <PurchaseitemsList id={id} setTotalSum={setTotalSum} />
        <PurchaseFooter id={id} purchase={purchase} totalSum={totalSum}/>        
      </form>
    </div>
  );
}
