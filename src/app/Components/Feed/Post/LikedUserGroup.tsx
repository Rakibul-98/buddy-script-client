import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "../../../../components/ui/avatar";

export default function LikedUserGroup({ likesCount }: { likesCount: number }) {
  return (
    <AvatarGroup className="flex -space-x-3.5">
      <>
        {Array.from({ length: Math.min(likesCount, 5) }).map((_, index) => (
          <Avatar className="cursor-pointer" key={index} >
            <AvatarImage className="ring-[3px] ring-white" src="https://github.com/shadcn.png" alt={`User ${index + 1}`} />
            <AvatarFallback>U{index + 1}</AvatarFallback>
          </Avatar>
        ))}

        <AvatarGroupCount className=" ring-[3px] bg-[#1890FF] text-white cursor-pointer">{likesCount}+</AvatarGroupCount>
      </>
    </AvatarGroup>
  )
}
