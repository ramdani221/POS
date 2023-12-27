import { useDispatch, useSelector } from "@/lib/redux";
import AlertDropdown from "./AlertDropdown";
import { useContext, useEffect, useState } from "react";
import { loadNotifAsync, selectNotifs } from "@/lib/redux/notif/notifSlice";
import { SocketContext } from "@/app/home/layout";

export default function Alert() {
  const [dropped, setDropped] = useState(false);
  const notifs = useSelector(selectNotifs);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("load_notif", (arg: any) => {
      dispatch(loadNotifAsync());
    });
  },[dispatch, socket]);

  useEffect(() => {
    dispatch(loadNotifAsync());
  }, [dispatch]);
  return (
    <li className="nav-item dropdown no-arrow mx-1">
      <button
        className="nav-link dropdown-toggle"
        id="alertsDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={() => setDropped(!dropped)}
      >
        <i className="fas fa-bell fa-fw"></i>
        <span className="badge badge-danger badge-counter">3+</span>
      </button>
      <AlertDropdown dropped={dropped} notifs={notifs} />
    </li>
  );
}
