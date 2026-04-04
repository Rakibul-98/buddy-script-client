import Image from 'next/image'
import React from 'react'

export default function Events() {
  return (
    <div>
      <div className="bg-white rounded-md p-6">
        <div className='flex justify-between items-center gap-2 mb-6'>
          <h3 className="text-xl ">Events</h3>
          <span className='text-xs text-[#1890FF] cursor-pointer'>See All</span>
        </div>
        <div className='space-y-4'>
          {[...Array(2)].map((_, i) => (
            <div key={i} className=" shadow-md rounded-sm">
              <div className=" w-full">
                <div className='relative w-full aspect-video '>
                  <Image
                    src="/assets/feed_event1.png"
                    alt="feed event"
                    fill
                    priority
                    className='object-cover rounded-sm'
                  />
                </div>
                <div className='flex gap-2 items-center p-4'>
                  <div className='bg-[#0acf83] w-fit text-white py-0.5 px-2.5 rounded-xs text-lg'>
                    <p className='font-bold -mb-2'>10</p>
                    <span>Jul</span>
                  </div>
                  <p className='text-lg '>No more terrorism no <br /> more cry</p>
                </div>
              </div>
              <div className='flex justify-between items-center gap-2 border-t px-4 py-3'>
                <p className='text-muted-foreground text-xs'>17 People Going</p>
                <button className='border border-[#1890FF] bg-[#1890FF]/5 text-[#1890FF] px-3.25 py-px rounded-xs hover:bg-[#1890FF] transition-colors duration-200 hover:text-white cursor-pointer'>Going</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
