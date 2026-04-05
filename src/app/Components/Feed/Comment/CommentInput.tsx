/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { BiImage } from "react-icons/bi";
import { PiMicrophone } from "react-icons/pi";

export default function CommentInput({ newComment, setNewComment, handleCreateComment, isCreating }: any) {
  return (
    <div className="mb-4 flex items-center bg-[#f6f6f6] px-3 rounded-2xl text-sm">
      <Image
        src="/assets/txt_img.png"
        alt="txt img"
        height={24}
        width={24}
        priority
      />
      <input
        placeholder="Write a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={handleCreateComment}
        className="w-full p-3 focus:outline-none"
        disabled={isCreating}
      />
      <div className="flex items-center gap-3 text-lg text-muted-foreground ">
        <PiMicrophone className="cursor-pointer" />
        <BiImage className="cursor-pointer" />
      </div>
    </div>
  )
}
