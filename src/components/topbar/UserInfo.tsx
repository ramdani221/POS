"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function UserInfo({ setShow }: { setShow: any }) {
  const { data, status } = useSession();
  const [dropped, setDropped] = useState(false);
  const ref: any = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropped(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [])

  return (
    <li className="nav-item dropdown no-arrow" ref={ref}>
      <button
        className="nav-link dropdown-toggle"
        role="button"
        onClick={() => setDropped(!dropped)}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
          {data?.user?.name}
        </span>
        <Image
          className="img-profile rounded-circle"
          src="/img/undraw_profile.svg"
          alt="..."
          width={32}
          height={32}
        />
      </button>

      <div
        className={
          "dropdown-menu dropdown-menu-right shadow animated--grow-in " +
          (dropped && "show")
        }
        aria-labelledby="userDropdown"
      >
        <Link className="dropdown-item" href="/home/profile">
          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          Profile
        </Link>
        <Link className="dropdown-item" href="/home/changepassword">
          <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
          Change Password
        </Link>
        <div className="dropdown-divider"></div>
        <button
          className="dropdown-item"
          data-toggle="modal"
          data-target="#logoutModal"
          onClick={() => setShow(true)}
        >
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </button>
      </div>
    </li>
  );
}
