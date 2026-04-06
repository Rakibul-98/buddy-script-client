'use client'

import { useState } from 'react'

import { Switch } from './ui/switch'
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'


const ThemeToggleButton = () => {
  const [checked, setChecked] = useState<boolean>(true)

  return (
    <div className=' border rounded-full bg-[#e5e5e5]'>
      <div className='relative ms-1.5 inline-grid h-10 grid-cols-[1fr_1fr] items-center font-medium'>
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          className='absolute inset-0 data-[size=default]:h-[inherit] data-[size=default]:w-18 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:group-data-[size=default]/switch:size-7.5 [&_span]:data-[state=checked]:translate-x-7 [&_span]:data-[state=checked]:rtl:-translate-x-7 cursor-pointer'
          aria-label='Switch with icon indicators'
        />
        <span className=' pointer-events-none relative ml-1.5 flex min-w-7 items-center text-center'>
          <IoSunnyOutline className=' size-5 rotate-140' aria-hidden='true' />
        </span>
        <span className=' pointer-events-none relative flex min-w-7 items-center text-center'>
          <IoMoonOutline className=' size-5 rotate-140' aria-hidden='true' />
        </span>
      </div>
    </div>
  )
}

export default ThemeToggleButton
