"use client";

import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Feed() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div>
      <header>
        <h1>Feed</h1>
        <Button
          onClick={handleLogout}
          variant="outline"
        >
          Logout
        </Button>
      </header>

      <div>
        <h2>Your Feed</h2>
        <p>Feed content will appear here...</p>
      </div>
    </div>
  );
}