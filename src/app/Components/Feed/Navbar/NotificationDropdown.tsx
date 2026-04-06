/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { HiDotsVertical } from "react-icons/hi"

export default function NotificationDropdown({ setIsOpen, isOpen, toggleNotificationDropdown }: any) {

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>

      <DropdownMenuTrigger className="absolute focus:outline-none right-0 opacity-0 pointer-events-none">
      </DropdownMenuTrigger>
      <DropdownMenuContent className="hidden lg:block w-100 p-4 mt-5.5 rounded-md shadow max-h-[calc(100vh-70px)] ring-0"
        side="bottom"
        align="end"
      >
        <div className='flex justify-between items-center gap-2 mb-7'>
          <h3 className="text-xl font-semibold">Notifications</h3>
          <HiDotsVertical onClick={toggleNotificationDropdown} size={18} className="cursor-pointer hover:text-[#1890FF] text-muted-foreground transition-colors duration-200" />
        </div>
        <div className="mb-7">
          <span className="p-2 rounded text-[#1890FF] bg-[#ddeeff] me-2 cursor-pointer">All</span>
          <span className="p-2 bg-muted rounded cursor-pointer">Unread</span>
        </div>
        <div>
          {Array.from({ length: 9 }).map((_, index) => (

            <div
              key={`${index}`}
            >
              <div className="cursor-pointer hover:bg-[#ebebeb] p-1.5 flex items-center gap-3 text-muted-foreground mb-5">
                <Image
                  src="/assets/friend-req.png"
                  alt="Notification Image"
                  width={56}
                  height={56}
                  className="rounded-full object-contain object-center"
                />
                <div>
                  <p className="text-sm">
                    <span className="text-foreground">Steve Jobs</span> {" "}
                    posted a link in your timeline.
                  </p>
                  <p className="text-[#1890ff] text-[13px] font-semibold mt-1">42 minutes ago</p>
                </div>
              </div>
              <div className="cursor-pointer hover:bg-[#ebebeb] p-1.5 flex items-center gap-3 text-muted-foreground mb-5">
                <Image
                  src="/assets/f2.png"
                  alt="Notification Image"
                  width={56}
                  height={56}
                  className="rounded-full object-contain object-center"
                />
                <div>
                  <p className="text-sm">
                    An admin changed the name of the group
                    <span className="text-foreground">{" "}Freelancer usa</span>
                    {" "}to <span className="text-foreground">{" "}Freelancer usa</span>
                  </p>
                  <p className="text-[#1890ff] text-[13px] font-semibold mt-1">42 minutes ago</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
