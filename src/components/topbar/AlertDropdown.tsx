import { SocketContext } from "@/app/home/layout";
import { useDispatch } from "@/lib/redux";
import { updateNotifAsync } from "@/lib/redux/notif/notifSlice";
import { addPurchaseAsync } from "@/lib/redux/purchases/purchaseSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function AlertDropdown({ dropped, notifs }: { dropped: any, notifs: NotifsType[] }) {
  const dispatch = useDispatch()
  const route = useRouter()
  const { data }: { data: any } = useSession()
  const socket = useContext(SocketContext);

  const create = (id: string) => {
    dispatch(
      addPurchaseAsync({
        totalsum: "0",
        operator: data?.user?.id,
        supplier: null,
      })
    ).then(({ payload }) => {
      dispatch(
        updateNotifAsync(id)
      ).then(() => {
        socket.emit("send_notif", "send")
        route.push(`/home/purchases/edit/${payload.id}`);
      })
    }).catch((err) => { });
  };

  if (notifs.length < 1) return (
    <div
      className={
        "dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in " +
        (dropped && "show")
      }
      aria-labelledby="alertsDropdown"
    >
      <h6 className="dropdown-header">Alerts Center</h6>
      <button
        className="dropdown-item d-flex align-items-center"
      >
        <div className="text-gray-500">
          No Alerts
        </div>
      </button>
    </div>
  );

  return (
    <div
      className={
        "dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in " +
        (dropped && "show")
      }
      aria-labelledby="alertsDropdown"
    >
      <h6 className="dropdown-header">Alerts Center</h6>
      {notifs.map((notif) => (
        <button
          className={"dropdown-item d-flex align-items-center " + (!notif.isRead && 'bg-gray-200')}
          key={notif._id}
          onClick={() => create(notif._id)}
        >
          <div className="mr-3">
            <div className="icon-circle bg-warning">
              <i className="fas fa-exclamation-triangle text-white"></i>
            </div>
          </div>
          <div>
            <div className="small text-gray-500">Barcode: {notif.barcode}</div>
            Stock Alert: <span className="font-weight-bold">
              {notif.name}
            </span>{" "}
            only have stock {notif.stock}
          </div>
        </button>
      ))}
    </div>
  );
}
