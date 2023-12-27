'use client'

import { useSession } from "next-auth/react";

export default function UsersLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const {data}: {data: any} = useSession()
  if (data?.user?.role !== 'Admin') return (
    <div
        className={
          "alert alert-secondary"
        }
        role="alert"
      >
        <i className="fas fa-exclamation-triangle"></i>
        <span className="ms-2">This page can only be accessed by Admin</span>
      </div>
  )
  return (
    <section>
      <div className="d-sm-flex flex-column mb-4">
        <h1 className="h3 mb-2 text-gray-800">Users</h1>
        {children}
      </div>
    </section>
  );
}
