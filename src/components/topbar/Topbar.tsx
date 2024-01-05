import Alert from "./Alerts";
import UserInfo from "./UserInfo";
import { useSession } from "next-auth/react";

export default function Topbar({
  setShow,
  toggled,
  setToggled,
}: {
  setShow: any;
  toggled: any;
  setToggled: any;
}) {
  const { data }: { data: any } = useSession()
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow ps-3 pe-3">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
        onClick={() => setToggled(!toggled)}
      >
        <i className="fa fa-bars"></i>
      </button>

      <ul className="navbar-nav ml-auto">

        {data.user.role === "Admin" && <Alert />}

        <div className="topbar-divider d-none d-sm-block"></div>

        <UserInfo setShow={setShow} />
      </ul>
    </nav>
  );
}
