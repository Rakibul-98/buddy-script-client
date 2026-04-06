import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const FAKE_AVATARS = [
  "/assets/react_img1.png",
  "/assets/react_img2.png",
  "/assets/react_img4.png",
];

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

interface LikedUsersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  likes: Like[];
}

export default function LikedUsersDialog({ open, onOpenChange, likes }: LikedUsersDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Liked by</DialogTitle>
        </DialogHeader>
        <ul className="mt-2 space-y-3 max-h-72 overflow-y-auto">
          {likes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No likes yet</p>
          ) : (
            likes.map((like, index) => (
              <li key={like.id} className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={FAKE_AVATARS[index % FAKE_AVATARS.length]}
                    alt={like.user.firstName}
                  />
                  <AvatarFallback>
                    {like.user.firstName[0]}{like.user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {like.user.firstName} {like.user.lastName}
                </span>
              </li>
            ))
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}