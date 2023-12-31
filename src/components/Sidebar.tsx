import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Sidebar({
  toggled,
  setToggled,
}: {
  toggled: any;
  setToggled: any;
}) {
  const { data }: { data: any } = useSession();
  const [collapse, setCollapse] = useState(false);
  const position = usePathname().split("/")[2];
  const ref: any = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setCollapse(false)
      }
    }

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [])

  return (
    <ul
      className={
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion " +
        (toggled && "toggled")
      }
      id="accordionSidebar"
    >
      <div className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">POS</div>
      </div>

      <hr className="sidebar-divider my-0" />

      {data.user.role === "Admin" && (
        <li className={"nav-item " + (position === "dashboard" && "active")}>
          <Link className="nav-link" href="/home/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
      )}

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Master</div>

      {data.user.role === "Admin" && (
        <li
          className={
            "nav-item " +
            ((position === "units" || position === "goods") && "active")
          }
          ref={ref}
        >
          <button
            className={"nav-link " + (!collapse && "collapsed")}
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-expanded="true"
            aria-controls="collapseUtilities"
            onClick={() => setCollapse(!collapse)}
          >
            <i className="fas fa-fw fa-wrench"></i>
            <span>Goods Utilities</span>
          </button>
          <div
            id="collapseUtilities"
            className={"collapse " + (collapse && "show")}
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
            style={{ transition: "2s" }}

          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Utilities:</h6>
              <Link className="collapse-item" href="/home/goods">
                Goods
              </Link>
              <Link className="collapse-item" href="/home/units">
                Units
              </Link>
            </div>
          </div>
        </li>
      )}

      <li className={"nav-item " + (position === "suppliers" && "active")}>
        <Link className="nav-link" href="/home/suppliers">
          <i className="fas fa-solid fa-link"></i>
          <span>Suppliers</span>
        </Link>
      </li>

      <li className={"nav-item " + (position === "customers" && " active")}>
        <Link className="nav-link" href="/home/customers">
          <i className="fas fa-solid fa-users"></i>
          <span>Customers</span>
        </Link>
      </li>

      {data.user.role === "Admin" && (
        <li className={"nav-item " + (position === "users" && "active")}>
          <Link className="nav-link" href="/home/users">
            <i className="fas fa-solid fa-user"></i>
            <span>Users</span>
          </Link>
        </li>
      )}

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">TRANSACTIONS</div>

      <li className={"nav-item " + (position === "purchases" && "active")}>
        <Link className="nav-link" href="/home/purchases">
          <i className="fas fa-fw fa-table"></i>
          <span>Purchases</span>
        </Link>
      </li>

      <li className={"nav-item " + (position === "sales" && "active")}>
        <Link className="nav-link" href="/home/sales">
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Sales</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={() => {
            setToggled(!toggled);
            setCollapse(false);
          }}
        ></button>
      </div>
    </ul>
  );
}
