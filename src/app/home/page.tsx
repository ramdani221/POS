"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data, status } = useSession();
  if (status === "loading") return <div>...loading</div>;
  if (!data || status !== "authenticated") redirect("/signIn");

  redirect("/home/dashboard");
}
