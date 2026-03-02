"use client";
import { useContext } from "react";
import Dashboard from "./Charts";
import { GlobalContext } from "@/components/GlobalContext";
import UnauthorizedPage from "@/app/unauthorized/page";

export default function Page() {
  const {state}  = useContext(GlobalContext);
  if (!state?.role_name?.includes("admin")) {
    return <UnauthorizedPage />;
  }

  return <Dashboard />;
}
