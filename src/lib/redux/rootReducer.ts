/* Instruments */

import customerSlice from "./customers/customerSlice";
import dashboardSlice from "./dashboard/dashboardSlice";
import goodSlice from "./goods/goodSlice";
import notifSlice from "./notif/notifSlice";
import purchaseItemSlice from "./purchaseItems/purchaseitemSlice";
import purchaseSlice from "./purchases/purchaseSlice";
import saleitrmSlice from "./saleitems/saleitemSlice";
import saleSlice from "./sales/saleSlice";
import supplierSlice from "./suppliers/supplierSlice";
import unitSlice from "./units/unitSlice";
import userSlice from "./users/userSlice";

export const reducer = {
  user: userSlice,
  unit: unitSlice,
  good: goodSlice,
  supplier: supplierSlice,
  purchase: purchaseSlice,
  purchaseitem: purchaseItemSlice,
  customer: customerSlice,
  sale: saleSlice,
  saleitem: saleitrmSlice,
  dashboard: dashboardSlice,
  notif: notifSlice
}