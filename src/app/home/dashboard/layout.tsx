'use client'
import ButtonReport from "@/components/dashboard/ButtonReport";
import { useSession } from "next-auth/react";

export default function UsersLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { data }: { data: any } = useSession()
  if (data?.user?.role !== 'Admin') return (
    <div className={"alert alert-secondary"} role="alert">
      <i className="fas fa-exclamation-triangle"></i>
      <span className="ms-2">This page can only be accessed by Admin</span>
    </div>
  )
  return (
    <section>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <ButtonReport />
      </div>
      {children}
    </section>
  );
}
