"use client";

import ProtectedRoute from "../Components/Auth/ProtectedRoute";


export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>
    <div className="min-h-screen flex justify-center items-center">
      {children}
    </div>
  </ProtectedRoute>;
}