import { NavIcon } from "./menuItem";

interface NavIconItemProps {
  icon: NavIcon;
  isActive: boolean;
  showLabel?: boolean;
  position?: "desktop" | "mobile" | "tablet";
}

export const NavIconItem = ({
  icon,
  isActive,
  showLabel = false,
  position = "desktop"
}: NavIconItemProps) => {
  const getPositionStyles = () => {
    switch (position) {
      case "mobile":
        return "p-2 rounded-lg";
      case "tablet":
        return "flex flex-col items-center gap-2 p-3 rounded-lg";
      default:
        return "";
    }
  };

  return (
    <div className={`relative cursor-pointer transition-all duration-200 ${getPositionStyles()}`}>
      <div className="relative">
        <icon.Icon
          size={24}
          className={`transition-colors duration-200 ${isActive && position !== "tablet" ? "text-[#1890FF]" : ""
            }`}
        />
        {icon.count && (
          <span className={`absolute flex font-semibold justify-center text-[11px] text-white bg-[#1890FF] rounded-full ${position === "mobile"
            ? "-top-1 -right-1 w-4 h-4"
            : "-top-1 -right-1.5 w-4 h-4"
            }`}>
            {icon.count}
          </span>
        )}
      </div>
      {showLabel && <span className="text-xs mt-1">{icon.label}</span>}
    </div>
  );
};