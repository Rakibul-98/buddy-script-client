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
    {
      id: 5,
      name: "Ryan Roslansky",
      image: "/assets/card2.png",
    },
    {
      id: 6,
      name: "Ryan Roslansky",
      image: "/assets/card3.png",
    },
    {
      id: 7,
      name: "Ryan Roslansky",
      image: "/assets/card3.png",
    },
    {
      id: 8,
      name: "Ryan Roslansky",
      image: "/assets/card2.png",
    },
    {
      id: 9,
      name: "Ryan Roslansky",
      image: "/assets/card3.png",
    },
    {
      id: 10,
      name: "Ryan Roslansky",
      image: "/assets/card3.png",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-2 lg:gap-6 overflow-hidden">
        {stories.map((story) => (
          <div key={story.id} className="shrink-0 flex flex-col items-center">
            <div
              className={`relative w-15 h-15 lg:w-34.75 lg:h-37 rounded-full lg:rounded-sm overflow-hidden cursor-pointer ${!story.isOwn && "group"
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
                  <div className="absolute w-6 lg:w-8 h-6 lg:h-8 bg-blue-500 rounded-full top-1/2 md:bottom-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:translate-y-0 text-white text-lg flex justify-center items-center border-2 lg:border-[#112032] z-50">
                    +
                  </div>

                  <div className="absolute bottom-0 w-full bg-[#112032] text-white hidden lg:flex flex-col items-center justify-center pt-8 pb-2 rounded-t-3xl">
                    <p className="text-xs">Your Story</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full border-2 border-white overflow-hidden hidden lg:block">
                    <Image
                      src="/assets/story_img.png"
                      alt="avatar"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <p className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 text-white text-xs font-medium whitespace-nowrap hidden lg:block">
                    {story.name}
                  </p>
                </>
              )}
            </div>

            <p className="text-center text-xs text-gray-600 pt-3 block lg:hidden max-w-10 overflow-hidden text-ellipsis whitespace-nowrap">
              {story.isOwn ? "Your Story" : story.name}
            </p>
          </div>
        ))}
      </div>

      <div className="hidden lg:absolute w-6 h-6 bg-blue-500 rounded-full top-1/2 -translate-y-1/2 -right-1 transform text-white text-lg lg:flex justify-center items-center border border-white z-50 cursor-pointer hover:bg-blue-600 transition-colors">
        <IoIosArrowRoundForward size={16} />
      </div>
    </div>
  );
}