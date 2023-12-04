/* Instruments */

import goodSlice from "./goods/goodSlice";
import supplierSlice from "./supliers/supplierSlice";
import unitSlice from "./units/unitSlice";
import userSlice from "./users/userSlice";

export const reducer = {
  user: userSlice,
  unit: unitSlice,
  good: goodSlice,
  supplier: supplierSlice,
}