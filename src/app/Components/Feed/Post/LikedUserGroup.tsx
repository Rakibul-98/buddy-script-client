import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "../../../../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface LikeUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface Like {
  id: string;
  userId: string;
  user: LikeUser;
}

interface LikedUserGroupProps {
  likesCount: number;
  likes: Like[];
}

export default function LikedUserGroup({ likesCount, likes }: LikedUserGroupProps) {
  const [open, setOpen] = useState(false);

  if (likesCount === 0) return <div className="text-sm text-muted-foreground">No likes yet</div>;

  const FAKE_AVATARS = [
    "/assets/react_img1.png",
    "/assets/react_img2.png",
    "/assets/react_img4.png",
  ];

  return (
    <>
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setOpen(true)}>
        <AvatarGroup className="flex -space-x-3.5">
          <>
            {Array.from({ length: Math.min(likesCount, 5) }).map((_, index) => (
              <Avatar className="cursor-pointer" key={index}>
                <AvatarImage
                  className="ring-[3px] ring-white"
                  src={FAKE_AVATARS[index % FAKE_AVATARS.length]}
                  alt={`User ${index + 1}`}
                />
                <AvatarFallback>U{index + 1}</AvatarFallback>
              </Avatar>
            ))}
            {likesCount > 5 && (
              <AvatarGroupCount className="ring-[3px] bg-[#1890FF] text-white cursor-pointer">
                {likesCount}+
              </AvatarGroupCount>
            )}
          </>
        </AvatarGroup>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Liked by</DialogTitle>
          </DialogHeader>
          <ul className="mt-2 space-y-3 max-h-72 overflow-y-auto">
            {likes.map((like, index) => (
              <li key={like.id} className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={FAKE_AVATARS[index % FAKE_AVATARS.length]}
                    alt={like.user.firstName} />
                  <AvatarFallback>
                    {like.user.firstName[0]}{like.user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {like.user.firstName} {like.user.lastName}
                </span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}