/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoImageOutline } from "react-icons/io5";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { FiEdit, FiEdit3 } from "react-icons/fi";
import { useUpdatePostMutation } from "../../../../redux/features/post/postApi";

interface EditPostDialogProps {
  post: {
    id: string;
    content: string;
    imageUrl?: string | null;
    visibility?: string;
  };
}

interface FormData {
  content: string;
}

export default function EditPostDialog({ post }: EditPostDialogProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(post.imageUrl || null);
  const [isOpen, setIsOpen] = useState(false);
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      content: post.content || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!data.content.trim() && !imageFile && !existingImage) {
      toast.error("Please add some content or an image");
      return;
    }

    const updateData: {
      content: string;
      visibility?: string;
    } = {
      content: data.content,
      visibility: post.visibility || "public",
    };

    try {
      await updatePost({ id: post.id, data: updateData }).unwrap();

      toast.success("Post updated successfully!");
      setIsOpen(false);
      reset();
      setImageFile(null);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update post");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className={`flex items-center justify-between w-full text-muted-foreground hover:text-[#1890FF] transition-colors cursor-pointer duration-200`}>
          <p className="flex items-center gap-3 text-base">
            <span className="bg-[#ebf2ff] p-2.75 rounded-full">
              <FiEdit size={21} className="text-[#1890FF]" />
            </span>
            Edit Post
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="p-5">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Update your post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <Image
                src="/assets/txt_img.png"
                alt="Profile"
                height={40}
                width={40}
                className="rounded-full"
                priority
              />
              <div className="relative w-full">
                <textarea
                  {...register("content", {
                    required: "Content is required",
                  })}
                  rows={2}
                  className="w-full pt-2 resize-none focus:outline-none  bg-[#f5f5f5] shadow-none px-3 rounded-xl text-base"
                />
              </div>
            </div>

            {(existingImage || imageFile) && (
              <div className="relative rounded-md overflow-hidden">
                <Image
                  src={imageFile ? URL.createObjectURL(imageFile) : existingImage!}
                  alt="Preview"
                  width={600}
                  height={400}
                  className="max-h-80 w-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="px-6 rounded-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="py-2 px-5.5 text-white bg-[#1890FF] hover:bg-[#1890FF]/90 rounded-sm flex gap-2 justify-center items-center"
            >
              <PiPaperPlaneTilt />
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}