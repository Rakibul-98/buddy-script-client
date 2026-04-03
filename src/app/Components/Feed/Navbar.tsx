import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { SearchIcon } from "lucide-react";

export default function Navbar() {
  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto max-w-7xl py-4 flex justify-between items-center">
          <div className="relative w-40 h-8">
            <Image
              src="/assets/logo.svg"
              alt="logo Image"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
          <div className="flex gap-2 items-center px-5 py-2 border border-[#f5f5f5] rounded-full bg-[#f5f5f5] hover:border-[#1890FF] focus-within:border-[#1890FF]">
            <span className="text-muted-foreground">
              <SearchIcon size={18} />
            </span>
            <input className="outline-none focus:outline-none w-89" type="text" placeholder="input search text" />
          </div>
          <div className="flex items-center gap-4">

            <Button variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}
