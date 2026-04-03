import { MenuIcon } from "lucide-react";
import { NAV_ICONS } from "./menuItem";
import { NavIconItem } from "./NavIconItem";

interface MobileBottomNavProps {
  activeIcon: string;
  onIconClick: (id: string) => void;
}

export const MobileBottomNav = ({ activeIcon, onIconClick }: MobileBottomNavProps) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg sm:hidden z-50">
    <div className="flex justify-between items-center px-6 py-3">
      {NAV_ICONS.map((icon) => (
        <div
          key={icon.id}
          className={`cursor-pointer transition-all duration-200 ${activeIcon === icon.id ? "text-[#1890FF]" : "text-gray-600 hover:text-[#1890FF]"
            }`}
          onClick={() => onIconClick(icon.id)}
        >
          <NavIconItem
            icon={icon}
            isActive={activeIcon === icon.id}
            position="mobile"
          />
        </div>
      ))}
      <div className="p-2 rounded-lg text-gray-600">
        <MenuIcon size={24} />
      </div>
    </div>
  </div>
);