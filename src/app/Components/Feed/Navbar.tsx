"use client";
import { useState } from "react";
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import { LuHouse } from "react-icons/lu";
import { IoIosArrowDown, IoIosPeople } from "react-icons/io";
import { PiBellThin } from "react-icons/pi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

export default function Navbar() {
  const [activeIcon, setActiveIcon] = useState("home");

  const icons = [
    { id: "home", Icon: LuHouse },
    { id: "people", Icon: IoIosPeople },
    { id: "notifications", Icon: PiBellThin },
    { id: "chat", Icon: HiOutlineChatBubbleOvalLeftEllipsis }
  ];

  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <div className="relative w-40 h-8">
            <Image
              src="/assets/logo.svg"
              alt="logo Image"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
          <div className="flex gap-2 items-center px-5 py-2 border border-[#f5f5f5] rounded-full bg-[#f5f5f5] hover:border-[#1890FF] focus-within:border-[#1890FF]">
            <span className="text-muted-foreground">
              <SearchIcon size={18} />
            </span>
            <input className="outline-none focus:outline-none w-89" type="text" placeholder="input search text" />
          </div>
          <div className="flex items-center gap-7">
            {icons.map(({ id, Icon }) => (
              <div
                key={id}
                className={`relative cursor-pointer transition-all duration-200 px-3 py-5 border-b-2 ${activeIcon === id
                  ? "text-[#1890FF] border-[#1890FF]"
                  : "border-transparent hover:text-[#1890FF] hover:border-[#1890FF]"
                  }`}
                onClick={() => setActiveIcon(id)}
              >
                <Icon size={24} className="transition-colors duration-200" />
              </div>
            ))}
            <div className="flex gap-2 items-center">
              <Image
                src="/assets/profile.png"
                alt="logo Image"
                height={24}
                width={24}
                priority
              />
              Dylan Field
              <IoIosArrowDown />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}