import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings } from "lucide-react"
import Image from "next/image"
import { GoQuestion } from "react-icons/go"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"
import { useDispatch } from "react-redux"
import { logout } from "../../../redux/features/auth/authSlice"
import { toast } from "sonner"

export default function ProfileDropdown() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  const menuItems = [
    { icon: Settings, label: "Settings", color: "hover:text-[#1890FF]" },
    { icon: GoQuestion, label: "Help & Support", color: "hover:text-[#1890FF]" },
    { icon: LogOut, label: "Logout", color: "hover:text-red-600", onClick: handleLogout },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <IoIosArrowDown className="cursor-pointer hover:text-[#1890FF] transition-colors duration-200" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-75 p-4 mt-2 rounded-md shadow ring-0">
        <div className="flex gap-3 items-center mb-4">
          <Image
            src="/assets/profile.png"
            alt="Profile image"
            height={54}
            width={54}
            priority
            className="rounded-full object-cover"
          />
          <div className="space-y-1">
            <h3 className="font-bold text-lg">Dylan Field</h3>
            <p className="text-[#1890FF] text-sm hover:underline cursor-pointer">
              View Profile
            </p>
          </div>
        </div>
        <DropdownMenuSeparator className="my-2" />

        {menuItems.map(({ icon: Icon, label, color, onClick }) => (
          <div
            key={label}
            onClick={onClick}
            className="cursor-pointer px-0 py-2 focus:bg-transparent"
          >
            <div className={`flex items-center justify-between w-full text-muted-foreground ${color} transition-colors duration-200`}>
              <p className="flex items-center gap-3 text-base">
                <span className="bg-[#ebf2ff] p-2.75 rounded-full">
                  <Icon size={21} className="text-[#1890FF]" />
                </span>
                {label}
              </p>
              <IoIosArrowForward />
            </div>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}