"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data, status } = useSession({required: true, onUnauthenticated() {
      redirect('/signIn')
  },});
  if (status === "loading") return <div>...loading</div>;

  redirect("/home/dashboard");
}
