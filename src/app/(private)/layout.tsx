"use client";

import ProtectedRoute from "../Components/Auth/ProtectedRoute";


export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>
    <div className="">
      {children}
    </div>
  </ProtectedRoute>;
}