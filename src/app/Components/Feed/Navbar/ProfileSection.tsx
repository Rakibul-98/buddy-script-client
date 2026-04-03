import Image from "next/image";
import ProfileDropdown from "./ProfileDropdown";
import { useAppSelector } from "../../../../redux/hooks";

interface ProfileSectionProps {
  showName?: boolean;
  size?: "small" | "large";
}

export const ProfileSection = ({ showName = true, size = "small" }: ProfileSectionProps) => {
  const imageSize = size === "large" ? 40 : 24;
  const { user } = useAppSelector((state) => state.auth);


  return (
    <div className="flex gap-2 items-center">
      <Image
        src="/assets/profile.png"
        alt="Profile"
        height={imageSize}
        width={imageSize}
        priority
        className="rounded-full"
      />
      {showName && <span className="hidden lg:inline">{user?.firstName} {user?.lastName}</span>}
      <ProfileDropdown />
    </div>
  );
};