/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';
import { useCreatePostMutation } from '../../../../redux/features/post/postApi';
import { useState } from 'react';
import Image from 'next/image';
import { RiArticleLine } from 'react-icons/ri';
import { LuCalendarDays } from 'react-icons/lu';
import { CiVideoOn } from 'react-icons/ci';
import { IoImageOutline } from 'react-icons/io5';
import { PiPaperPlaneTilt } from 'react-icons/pi';

interface CreatePostSectionProps {
  onPostCreated: () => void;
}

export default function CreatePostSection({ onPostCreated }: CreatePostSectionProps) {

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && !imageFile) {
      toast.error("Please add some content or an image");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("visibility", "PUBLIC");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await createPost(formData).unwrap();
      toast.success("Post created successfully!");
      setContent("");
      setImageFile(null);
      onPostCreated();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to create post");
    }
  };

  const fakeButtons = [
    {
      id: 1,
      icon: CiVideoOn,
      title: "Video"
    },
    {
      id: 2,
      icon: LuCalendarDays,
      title: "Event"
    },
    {
      id: 3,
      icon: RiArticleLine,
      title: "Article"
    },
  ]


  return (
    <div className="bg-white rounded-md p-6">
      <form onSubmit={handleCreatePost} className="space-y-4">
        <div className='flex items-start gap-2'>
          <Image
            src="/assets/txt_img.png"
            alt="txt img"
            height={37}
            width={37}
            priority
          />
          <textarea
            placeholder="Write Something ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full py-2 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between bg-[#f3f9ff] px-4 py-2 rounded-sm">

          <div className="flex items-center gap-6 text-muted-foreground">

            {/* IMAGE UPLOAD (functional) */}
            <label className="cursor-pointer hover:text-[#1890FF]">
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              <span>
                {imageFile ? imageFile.name :
                  <span className='flex items-center gap-2'><IoImageOutline size={20} />Photo</span>
                }
              </span>
            </label>
            {
              fakeButtons.map(btn =>
                <span key={btn.id} className='flex items-center gap-2 cursor-pointer hover:text-[#1890FF]'><btn.icon size={20} />{btn.title}</span>
              )
            }
          </div>

          {/* POST BUTTON (moved right) */}
          <button className="py-3 px-5.5 text-white bg-[#1890FF] rounded-sm flex gap-2 items-center" type="submit" disabled={isCreating}>
            <PiPaperPlaneTilt />
            {isCreating ? "Posting..." : "Post"}
          </button>
        </div>

      </form>
    </div>
  )
}
