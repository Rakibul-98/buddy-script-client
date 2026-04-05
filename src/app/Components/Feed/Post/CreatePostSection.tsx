/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';
import { useCreatePostMutation } from '../../../../redux/features/post/postApi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { RiArticleLine } from 'react-icons/ri';
import { LuCalendarDays } from 'react-icons/lu';
import { CiVideoOn } from 'react-icons/ci';
import { IoImageOutline } from 'react-icons/io5';
import { PiPaperPlaneTilt } from 'react-icons/pi';
import { FiEdit3 } from 'react-icons/fi';

interface CreatePostSectionProps {
  onPostCreated: () => void;
}

interface FormData {
  content: string;
}

export default function CreatePostSection({ onPostCreated }: CreatePostSectionProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [isFocused, setIsFocused] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      content: ""
    }
  });

  const content = watch("content");

  const onSubmit = async (data: FormData) => {
    if (!data.content.trim() && !imageFile) {
      toast.error("Please add some content or an image");
      return;
    }

    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("visibility", "PUBLIC");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await createPost(formData).unwrap();
      toast.success("Post created successfully!");
      reset();
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
  ];

  return (
    <div className="bg-white rounded-md p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className='flex items-start gap-2'>
          <Image
            src="/assets/txt_img.png"
            alt="txt img"
            height={37}
            width={37}
            priority
          />
          <div className="relative w-full">
            <textarea
              {...register("content")}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={3}
              className="w-full pt-2 focus:border-indigo-500 focus:outline-none resize-none"
            />

            <div
              className={`absolute left-1 top-2 flex items-center gap-1 text-gray-400 transition-all duration-500 pointer-events-none ${isFocused || content ? '-translate-y-5 text-xs opacity-0' : 'translate-y-0 opacity-100'}`}
            >
              <span>Write Something ...</span>
              <FiEdit3 />
            </div>
          </div>
        </div>
        <div className="flex px-2 lg:flex-col xl:flex-row items-center lg:items-start justify-between bg-[#f3f9ff] py-2 rounded-sm">

          <div className="w-full flex lg:justify-between xl:justify-start items-center gap-3 lg:gap-6 text-muted-foreground py-2 lg:py-3 px-4">

            <label className="cursor-pointer hover:text-[#1890FF]">
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              <span>
                {imageFile ? <p className='max-w-20 overflow-hidden text-ellipsis whitespace-nowrap'>{imageFile.name}</p> :
                  <span className='flex items-center gap-2 '><IoImageOutline size={20} />
                    <span className='hidden md:block'>Photo</span>
                  </span>
                }
              </span>
            </label>
            {
              fakeButtons.map(btn =>
                <span key={btn.id} className='flex items-center gap-2 cursor-pointer hover:text-[#1890FF]'><btn.icon size={20} />
                  <span className='hidden md:block'>{btn.title}</span>
                </span>
              )
            }
          </div>

          <button className="py-2 lg:py-3 px-5.5 text-white bg-[#1890FF] rounded-sm flex gap-2 justify-center items-center lg:w-full xl:w-auto cursor-pointer" type="submit" disabled={isCreating}>
            <PiPaperPlaneTilt />
            {isCreating ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}