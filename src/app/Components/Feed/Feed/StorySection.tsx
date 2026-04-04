import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function StorySection() {
  const stories = [
    {
      id: 1,
      name: "Your Story",
      image: "/assets/card1.png",
      isOwn: true,
    },
    {
      id: 2,
      name: "Ryan Roslansky",
      image: "/assets/card2.png",
    },
    {
      id: 3,
      name: "Ryan Roslansky",
      image: "/assets/card3.png",
    },
    {
      id: 4,
      name: "Ryan Roslansky",
      image: "/assets/card4.png",
    },
  ];

  return (
    <div className="flex gap-6 relative overflow-hidden">
      {stories.map((story) => (
        <div
          key={story.id}
          className={`relative w-37 h-40 rounded-sm overflow-hidden cursor-pointer ${!story.isOwn && "group"
            }`}
        >
          <Image
            src={story.image}
            alt={story.name}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50 transition-colors duration-200 group-hover:bg-black/70" />

          {story.isOwn ? (
            <>
              <div className="absolute w-8 h-8 bg-blue-500 rounded-full bottom-9 left-1/2 transform -translate-x-1/2 text-white text-lg mb-1 flex justify-center items-center border-2 border-[#112032] z-50">
                +
              </div>
              <div className="absolute bottom-0 w-full bg-[#112032] text-white flex flex-col items-center justify-center pt-8 pb-2 rounded-t-3xl">
                <p className="text-sm">Your Story</p>
              </div>
            </>
          ) : (
            <>
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                <Image
                  src="/assets/story_img.png"
                  alt="avatar"
                  fill
                  className="object-cover"
                />
              </div>

              <p className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium whitespace-nowrap">
                {story.name}
              </p>
            </>
          )}
        </div>
      ))}
      <div className="absolute w-6 h-6 bg-blue-500 rounded-full top-1/2 -translate-y-1/2 -right-1.5 transform  text-white text-lg mb-1 flex justify-center items-center border-2 border-white">
        <IoIosArrowRoundForward size={16} />
      </div>
    </div>
  );
}