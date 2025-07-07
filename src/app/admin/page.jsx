"use client";

import AdminDashboard from "@/modules/admin/AdminDashboard";
import { Suspense } from "react";


export default function AdminPage() {
  return  <Suspense fallback={<div>Loading...</div>}>
    <AdminDashboard />;
  </Suspense>;

}
