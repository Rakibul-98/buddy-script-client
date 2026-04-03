/* eslint-disable @typescript-eslint/no-explicit-any */
import { LuHouse } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";
import { PiBellThin } from "react-icons/pi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

export interface NavIcon {
  id: string;
  Icon: React.ComponentType<any>;
  label: string;
  count?: number;
}

export const NAV_ICONS: NavIcon[] = [
  { id: "home", Icon: LuHouse, label: "Home" },
  { id: "people", Icon: IoIosPeople, label: "People" },
  { id: "notifications", Icon: PiBellThin, count: 6, label: "Notifications" },
  {
    id: "chat",
    Icon: HiOutlineChatBubbleOvalLeftEllipsis,
    count: 2,
    label: "Chat",
  },
];
