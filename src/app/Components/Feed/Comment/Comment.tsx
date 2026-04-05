/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import CommentInput from "./CommentInput";
import CommentActions from "./CommentActions";
import { Edit, Trash } from "lucide-react";


interface CommentProps {
  comment: any;
  postId: string;
  onReply: (postId: string, content: string, parentId: string) => void;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
  level?: number;
}

export default function Comment({
  comment,
  postId,
  onReply,
  onEdit,
  onDelete,
  level = 0
}: CommentProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState(comment.content);
  const [showAllReplies, setShowAllReplies] = useState(false);



  const handleReplySubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (replyContent.trim()) {
        onReply(postId, replyContent, comment.id);
        setReplyContent("");
        setIsReplying(false);
      } else {
        toast.error("Please enter a reply");
      }
    }
  };

  const handleEditSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (editContent.trim()) {
        onEdit(comment.id, editContent);
        setIsEditing(false);
      } else {
        toast.error("Please enter content");
      }
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      onDelete(comment.id);
    }
  };

  const replies = comment.replies || [];

  const latestReply = replies[replies.length - 1];
  const previousReplyCount = replies.length - 1;

  const visibleReplies = showAllReplies
    ? replies
    : latestReply
      ? [latestReply]
      : [];

  return (
    <div className={`${level > 0 ? 'ml-14 mt-3' : 'mt-6'}`}>

      <div className="relative flex items-start gap-3">
        <Image
          src="/assets/txt_img.png"
          alt="txt img"
          height={40}
          width={40}
          priority
        />
        <div className="w-full bg-[#f6f6f6] rounded-2xl p-3">
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-gray-900">
                {comment.author.firstName} {comment.author.lastName}
              </span>
              {comment._count?.likes > 0 && (
                <span className="text-xs text-gray-500">
                  ❤️ {comment._count.likes} likes
                </span>
              )}
            </div>

            {user?.email === comment.author.email && (
              <div className="flex gap-2 text-xs">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="hover:text-blue-500 cursor-pointer"
                >
                  <Edit size={15} />
                </button>
                <button
                  onClick={handleDelete}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <Trash size={15} />
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <CommentInput
              newComment={editContent}
              setNewComment={setEditContent}
              handleCreateComment={handleEditSubmit}
            />
          ) : (
            <p className="text-muted-foreground">{comment.content}</p>
          )}
        </div>
        <div className="absolute right-0 -bottom-2 flex items-center shadow-md rounded-full px-1 bg-white">
          <AiOutlineLike className="text-blue-500" />
          <IoMdHeartEmpty className="text-red-500" />
          <span>198</span>
        </div>

      </div>
      <CommentActions user={user} isEditing={isEditing} setIsReplying={setIsReplying} isReplying={isReplying} comment={comment} />

      {isReplying && (
        <div className="mt-2 ml-12">
          <CommentInput
            newComment={replyContent}
            setNewComment={setReplyContent}
            handleCreateComment={handleReplySubmit}
          />
        </div>
      )}

      {replies.length > 0 && (
        <div className="mt-2">

          {replies.length > 1 && (
            <p
              onClick={() => setShowAllReplies(!showAllReplies)}
              className="text-sm text-muted-foreground cursor-pointer mb-1 ms-14"
            >
              {showAllReplies
                ? "Hide replies"
                : `View all ${previousReplyCount} repl${previousReplyCount > 1 ? "ies" : "y"}`}
            </p>
          )}

          {visibleReplies.map((reply: any) => (
            <Comment
              key={reply.id}
              comment={reply}
              postId={postId}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}