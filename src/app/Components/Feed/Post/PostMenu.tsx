/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiDotsVertical } from "react-icons/hi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../../../components/ui/dropdown-menu";
import { CiBookmark } from "react-icons/ci";
import { BiBell } from "react-icons/bi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";
import { LuTrash2 } from "react-icons/lu";
import EditPostDialog from "./EditPostDialog";

export default function PostMenu({
  onDelete,
  isDeleting,
  onToggleVisibility,
  isPrivate,
  post
}: any) {

  const menuItems = [
    { icon: CiBookmark, label: "Save Post" },
    { icon: BiBell, label: "Turn On Notification" },
    {
      icon: AiOutlineCloseSquare,
      label: isPrivate ? "Show Post" : "Hide Post",
      action: onToggleVisibility,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <HiDotsVertical size={18} className="cursor-pointer hover:text-[#1890FF] text-muted-foreground transition-colors duration-200" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-75 p-4 mt-2 rounded-md shadow ring-0"
        side="bottom"
        align="end">

        {menuItems.map(({ icon: Icon, label, action }) => (
          <div
            key={label} onClick={action}
            className="cursor-pointer px-0 py-2 focus:bg-transparent"
          >
            <div className={`flex items-center justify-between w-full text-muted-foreground hover:text-[#1890FF] transition-colors duration-200`}>
              <p className="flex items-center gap-3 text-base">
                <span className="bg-[#ebf2ff] p-2.75 rounded-full">
                  <Icon size={21} className="text-[#1890FF]" />
                </span>
                {label}
              </p>
            </div>
          </div>
        ))}
        <EditPostDialog post={post} />
        <br />
        <ConfirmDeleteDialog item={"Post"} button={<div
          className="cursor-pointer px-0 py-2 focus:bg-transparent"
        >
          <div className={`flex items-center justify-between w-full text-muted-foreground hover:text-[#1890FF] transition-colors duration-200`}>
            <p className="flex items-center gap-3 text-base">
              <span className="bg-[#ebf2ff] p-2.75 rounded-full">
                <LuTrash2 size={21} className="text-[#1890FF]" />
              </span>
              Delete Post
            </p>
          </div>
        </div>} isDeleting={isDeleting} handleDelete={onDelete} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
