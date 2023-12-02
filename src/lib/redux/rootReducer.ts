/* Instruments */

import goodSlice from "./goods/goodSlice";
import unitSlice from "./units/unitSlice";
import userSlice from "./users/userSlice";

export const reducer = {
  user: userSlice,
  unit: unitSlice,
  good: goodSlice
}