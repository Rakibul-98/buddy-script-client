
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { SearchBar } from "./SearchBar";
import { NAV_ICONS } from "./menuItem";
import { NavIconItem } from "./NavIconItem";
import { useAppSelector } from "../../../../redux/hooks";
import Image from "next/image";
import ProfileDropdown from "./ProfileDropdown";

interface TabletMenuContentProps {
  activeIcon: string;
  onIconClick: (id: string) => void;
}

export const TabletMenuContent = ({ activeIcon, onIconClick }: TabletMenuContentProps) => {
  const { user } = useAppSelector((state) => state.auth);

  return (

    <DropdownMenuContent
      className="hidden sm:flex lg:hidden w-[calc(100vw-2rem)] p-4 mt-2 mr-3 ring-0"
      align="center"
    >
      <div className="space-y-6 w-full">
        <SearchBar />

        <div className="space-y-4">
          {/* Icons Grid */}
          <div className="grid grid-cols-4 gap-3">
            {NAV_ICONS.map((icon) => (
              <div
                key={icon.id}
                className={`cursor-pointer transition-all duration-200 ${activeIcon === icon.id
                  ? "text-[#1890FF] bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
                onClick={() => onIconClick(icon.id)}
              >
                <NavIconItem
                  icon={icon}
                  isActive={activeIcon === icon.id}
                  showLabel={true}
                  position="tablet"
                />
              </div>
            ))}
          </div>

          {/* Profile Section */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex gap-2 items-center">
                <Image
                  src="/assets/profile.png"
                  alt="Profile"
                  height={40}
                  width={40}
                  priority
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{user?.firstName} {user?.lastName}</div>
                <div className="text-sm text-gray-500">View profile</div>
              </div>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>
    </DropdownMenuContent>
  );
};