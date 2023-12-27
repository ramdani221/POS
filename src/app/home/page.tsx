"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data }: { data: any } = useSession();
  if (data.user.role === "Admin") return redirect("/home/dashboard");
  else return redirect('/home/sales')
}
