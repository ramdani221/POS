import Image from "next/image";
import { useState } from "react";
import SearchDropdown from "./SearchDropdown";
import Alert from "./Alerts";
import UserInfo from "./UserInfo";

export default function Topbar({
  setShow,
  toggled,
  setToggled,
}: {
  setShow: any;
  toggled: any;
  setToggled: any;
}) {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
        onClick={() => setToggled(!toggled)}
      >
        <i className="fa fa-bars"></i>
      </button>

      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>

      <ul className="navbar-nav ml-auto">
        <SearchDropdown />

        <Alert />

        <div className="topbar-divider d-none d-sm-block"></div>

        <UserInfo setShow={setShow} />
      </ul>
    </nav>
  );
}
