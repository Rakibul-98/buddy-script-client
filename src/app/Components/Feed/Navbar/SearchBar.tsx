import { SearchIcon } from "lucide-react";

interface SearchBarProps {
  className?: string;
}

export const SearchBar = ({ className = "" }: SearchBarProps) => (
  <div className={`flex gap-2 items-center px-5 py-2 border border-[#f5f5f5] rounded-full bg-[#f5f5f5] hover:border-[#1890FF] focus-within:border-[#1890FF] ${className}`}>
    <span className="text-muted-foreground">
      <SearchIcon size={18} />
    </span>
    <input
      className="outline-none focus:outline-none flex-1 bg-transparent"
      type="text"
      placeholder="input search text"
    />
  </div>
);