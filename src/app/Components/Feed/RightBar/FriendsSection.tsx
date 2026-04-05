import Image from "next/image";

export default function FriendsSection() {
  return (
    <div className="bg-white rounded-md p-6">
      <div className='flex justify-between items-center gap-2 mb-4 pb-4 border-b'>
        <h3 className="text-xl ">You Might Like</h3>
        <span className='text-xs text-[#1890FF] cursor-pointer'>See All</span>
      </div>
      <div className="space-y-5">
        <div className='flex items-center gap-3'>
          <Image
            src='/assets/img5.png'
            alt="person"
            height={50}
            width={50}
            priority
          />
          <div className='space-y-1'>
            <p className="text-black">
              Radovan Skill Arena
            </p>
            <p className="text-xs text-muted-foreground">Founder and CEO at Trophy</p>
          </div>
        </div>
        <div className="flex gap-2 justify-between text-sm">
          <button className='border px-1.75 py-2 hover:bg-[#1890FF] transition-colors duration-200 text-muted-foreground hover:text-white cursor-pointer w-1/2 rounded-sm'>Ignore</button>
          <button className='border px-1.75 py-1 bg-[#1890FF] text-white hover:bg-[#1890FF]/90 cursor-pointer w-1/2 rounded-sm'>Follow</button>
        </div>
      </div>
    </div>
  )
}
