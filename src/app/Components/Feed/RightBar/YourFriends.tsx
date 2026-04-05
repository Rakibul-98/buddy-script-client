import Image from 'next/image'
import { SearchBar } from '../Navbar/SearchBar'

export default function YourFriends() {

  const people = [
    {
      id: 1,
      img: "/assets/people1.png",
      name: "Steve Jobs",
      position: "CEO of Apple",
    },
    {
      id: 2,
      img: "/assets/people2.png",
      name: "Ryan Roslansky",
      position: "CEO od Linkedin",
    },
    {
      id: 3,
      img: "/assets/people3.png",
      name: "Dylan Field",
      position: "CEO of Figma",
    },
    {
      id: 4,
      img: "/assets/people1.png",
      name: "Steve Jobs",
      position: "CEO of Apple",
    },
    {
      id: 5,
      img: "/assets/people2.png",
      name: "Ryan Roslansky",
      position: "CEO od Linkedin",
    },
    {
      id: 6,
      img: "/assets/people3.png",
      name: "Dylan Field",
      position: "CEO of Figma",
    },
    {
      id: 8,
      img: "/assets/people3.png",
      name: "Dylan Field",
      position: "CEO of Figma",
    },
    {
      id: 7,
      img: "/assets/people1.png",
      name: "Steve Jobs",
      position: "CEO of Apple",
    },
  ]

  return (
    <div className="bg-white rounded-md p-6">
      <div className='flex justify-between items-center gap-2 mb-6'>
        <h3 className="text-xl ">Your Friends</h3>
        <span className='text-xs text-[#1890FF] cursor-pointer'>See All</span>
      </div>
      <SearchBar />
      <div className="space-y-6 mt-6">
        {people.map(({ img, name, id, position }) => (
          <div key={id} className={`flex items-center justify-between w-full text-muted-foreground hover:bg-[#dddfdf] rounded-md p-1.25`}>
            <div className='flex items-center gap-3'>
              <Image
                src={img}
                alt={name}
                height={40}
                width={40}
                priority
              />
              <div className='space-y-1'>
                <p className="text-black hover:cursor-pointer">
                  {name}
                </p>
                <p className="text-[11px]">{position}</p>
              </div>
            </div>
            {
              name == "Steve Jobs" ? <p className='text-[11px]'>5 minute ago</p> : <div className='h-3 w-3 bg-green-500 rounded-full border-2 border-white' />
            }
          </div>
        ))}
      </div>
    </div>
  )
}
