import Image from 'next/image'
import React from 'react'

export default function SuggestedPeople() {

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
  ]

  return (
    <div className="bg-white rounded-md p-6 h-fit">
      <div className='flex justify-between items-center gap-2 mb-4'>
        <h3 className="text-xl ">Suggested People</h3>
        <span className='text-xs text-[#1890FF] cursor-pointer'>See All</span>
      </div>
      <div className="space-y-5">
        {people.map(({ img, name, id, position }) => (
          <div key={id} className={`flex items-center justify-between w-full text-muted-foreground`}>
            <div className='flex items-center gap-3'>
              <Image
                src={img}
                alt={name}
                height={40}
                width={40}
                priority
              />
              <div className='space-y-1'>
                <p className="text-black">
                  {name}
                </p>
                <p className="text-xs">{position}</p>
              </div>
            </div>
            <button className='border px-1.75 py-1 hover:bg-[#1890FF] transition-colors duration-200 hover:text-white cursor-pointer'>Connect</button>
          </div>
        ))}
      </div>
    </div>
  )
}
