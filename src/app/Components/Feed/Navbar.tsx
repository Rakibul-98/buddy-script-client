/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";
import { SearchIcon, MenuIcon } from "lucide-react";
import { LuHouse } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";
import { PiBellThin } from "react-icons/pi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [activeIcon, setActiveIcon] = useState("home");

  const icons = [
    { id: "home", Icon: LuHouse, label: "Home" },
    { id: "people", Icon: IoIosPeople, label: "People" },
    { id: "notifications", Icon: PiBellThin, count: 6, label: "Notifications" },
    { id: "chat", Icon: HiOutlineChatBubbleOvalLeftEllipsis, count: 2, label: "Chat" }
  ];

  const handleIconClick = (id: any) => {
    setActiveIcon(id);
  };

  return (
    <div>
      <header className="bg-white ">
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

          {/* Desktop Search Bar - Hidden on mobile/tablet */}
          <div className="hidden lg:flex gap-2 items-center px-5 py-2 border border-[#f5f5f5] rounded-full bg-[#f5f5f5] hover:border-[#1890FF] focus-within:border-[#1890FF]">
            <span className="text-muted-foreground">
              <SearchIcon size={18} />
            </span>
            <input
              className="outline-none focus:outline-none w-89"
              type="text"
              placeholder="input search text"
            />
          </div>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="hidden lg:flex items-center gap-6.5">
            {icons.map(({ id, Icon, count }) => (
              <div
                key={id}
                className={`relative cursor-pointer transition-all duration-200 px-3 py-5.5 border-b-2 ${activeIcon === id
                  ? "text-[#1890FF] border-[#1890FF]"
                  : "border-transparent hover:text-[#1890FF] hover:border-[#1890FF] text-muted-foreground"
                  }`}
                onClick={() => handleIconClick(id)}
              >
                <Icon size={24} className="transition-colors duration-200" />
                {count && (
                  <span className="absolute top-4 right-2 w-4 h-4 flex font-semibold justify-center text-[11px] text-white bg-[#1890FF] rounded-full">
                    {count}
                  </span>
                )}
              </div>
            ))}
            <div className="flex gap-2 items-center">
              <Image
                src="/assets/profile.png"
                alt="Profile"
                height={24}
                width={24}
                priority
                className="rounded-full"
              />
              <span className="hidden lg:inline">Dylan Field</span>
              <ProfileDropdown />
            </div>
          </div>

          {/* Tablet Menu Button - Visible only on tablet */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MenuIcon className="hover:cursor-pointer" size={24} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="lg:hidden w-[calc(100vw-2rem)] p-4 mt-2 mr-3 ring-0"
                sideOffset={8}
                align="center"
              >
                <div className="space-y-6">
                  {/* Tablet Search Bar */}
                  <div className="flex gap-2 items-center px-5 py-2 border border-[#f5f5f5] rounded-full bg-[#f5f5f5] hover:border-[#1890FF] focus-within:border-[#1890FF]">
                    <span className="text-muted-foreground">
                      <SearchIcon size={18} />
                    </span>
                    <input
                      className="outline-none focus:outline-none flex-1 bg-transparent"
                      type="text"
                      placeholder="input search text"
                    />
                  </div>

                  {/* Menu Items in Two Rows */}
                  <div className="space-y-4">
                    {/* First Row - Icons */}
                    <div className="grid grid-cols-4 gap-3">
                      {icons.map(({ id, Icon, count, label }) => (
                        <div
                          key={id}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-200 ${activeIcon === id
                            ? "text-[#1890FF] bg-blue-50"
                            : "text-gray-600 hover:bg-gray-50"
                            }`}
                          onClick={() => handleIconClick(id)}
                        >
                          <div className="relative">
                            <Icon size={24} />
                            {count && (
                              <span className="absolute -top-2 -right-2 w-4 h-4 flex font-semibold justify-center text-[11px] text-white bg-[#1890FF] rounded-full">
                                {count}
                              </span>
                            )}
                          </div>
                          <span className="text-xs">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Second Row - Profile Section */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <Image
                          src="/assets/profile.png"
                          alt="Profile"
                          height={40}
                          width={40}
                          priority
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="font-semibold">Dylan Field</div>
                          <div className="text-sm text-gray-500">View profile</div>
                        </div>
                        <ProfileDropdown />
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
}