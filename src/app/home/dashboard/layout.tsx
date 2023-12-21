'use client'
import ButtonReport from "@/components/dashboard/ButtonReport";
import { CSVLink } from "react-csv";

export default function UsersLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
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
