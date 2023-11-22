"use client";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/Footer";
import Modal from "../../components/Modal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggled, setToggled] = useState(false);
  const [show, setShow] = useState(false);

  const { data, status } = useSession();

  if (status === "loading")
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (!data || status !== "authenticated") redirect("/signIn");
  
  return (
    <section>
      <div id="wrapper">
        <Sidebar toggled={toggled} setToggled={setToggled} />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar
              setShow={setShow}
              toggled={toggled}
              setToggled={setToggled}
            />
            <div className="container-fluid overflow-scroll">{children}</div>
          </div>
          <Footer />
        </div>
      </div>
      {show && <Modal setShow={setShow} />}
    </section>
  );
}
