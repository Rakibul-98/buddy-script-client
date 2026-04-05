
"use client";
import { useState } from "react";
import Image from "next/image";
import { SearchIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { NavIconItem } from "./NavIconItem";
import { ProfileSection } from "./ProfileSection";
import { TabletMenuContent } from "./TabletMenuContent";
import { MobileBottomNav } from "./MobileBottomNav";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_ICONS } from "./menuItem";

export default function Navbar() {
  const [activeIcon, setActiveIcon] = useState("home");

  const handleIconClick = (id: string) => {
    setActiveIcon(id);
  };

  const getIconBorderClass = (iconId: string) => {
    const isActive = activeIcon === iconId;
    return `px-3 py-5.5 border-b-2 ${isActive
      ? "text-[#1890FF] border-[#1890FF]"
      : "border-transparent hover:text-[#1890FF] hover:border-[#1890FF] text-muted-foreground"
      }`;
  };

  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 lg:py-0 xl:px-0 flex justify-between items-center gap-3">
          {/* Logo */}
          <div className="relative w-35 h-7.5">
            <Link href="/">
              <Image
                src="/assets/logo.svg"
                alt="logo Image"
                fill
                className="object-contain object-center"
                priority
              />
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <SearchBar className="hidden lg:flex w-105" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6.5">
            {NAV_ICONS.map((icon) => (
              <div
                key={icon.id}
                className={getIconBorderClass(icon.id)}
                onClick={() => handleIconClick(icon.id)}
              >
                <NavIconItem
                  icon={icon}
                  isActive={activeIcon === icon.id}
                  position="desktop"
                />
              </div>
            ))}
            <ProfileSection showName={true} />
          </div>

          {/* Mobile Search Icon */}
          <div className="flex sm:hidden">
            <SearchIcon className="hover:cursor-pointer text-muted-foreground" size={18} />
          </div>

          {/* Tablet Menu Button */}
          <div className="hidden sm:flex lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MenuIcon className="hover:cursor-pointer" size={24} />
              </DropdownMenuTrigger>
              <TabletMenuContent
                activeIcon={activeIcon}
                onIconClick={handleIconClick}
              />
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeIcon={activeIcon}
        onIconClick={handleIconClick}
      />
    </div>
  );
}