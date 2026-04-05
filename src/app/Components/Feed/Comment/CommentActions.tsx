/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useToggleLikeMutation } from "../../../../redux/features/like/likeApi";
import { timeAgo } from "../../../utils";
import { toast } from "sonner";

export default function CommentActions({ user, isEditing, setIsReplying, isReplying, comment, level }: any) {

  const [toggleLike, { isLoading: isTogglingLike }] = useToggleLikeMutation();
  const [isLiked, setIsLiked] = useState(false);



  useEffect(() => {
    if (comment.likes && user?.id) {
      const userLiked = comment.likes.some((like: any) => like.userId === user.id);
      setIsLiked(userLiked);
    }
  }, [comment.likes, user?.id]);


  const handleLike = async () => {
    try {
      const response = await toggleLike({
        targetId: comment.id,
        targetType: "COMMENT",
      }).unwrap();

      if (response.data?.liked) {
        setIsLiked(true);
        toast.success("Comment liked!");
      } else {
        setIsLiked(false);
        toast.success("Comment unliked!");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to toggle like");
    }
  };

  return (
    <div className="ms-16 flex gap-2 my-3 text-sm">
      <button
        onClick={handleLike}
        disabled={isTogglingLike}
        className={`transition-colors ${isLiked && "text-[#1890FF]"} hover:text-[#1890FF]"} cursor-pointer`}
      >
        {isLiked ? "Liked." : "Like."}
      </button>

      {!isEditing && (
        <button
          onClick={() => setIsReplying(!isReplying)}
          disabled={level > 0}
          className="cursor-pointer"
        >
          {isReplying ? "Cancel." : "Reply."}
        </button>
      )}
      <span className="cursor-pointer" >Share</span>
      <span className=" text-muted-foreground">
        {timeAgo(comment.createdAt)}
      </span>
    </div>
  )
}
