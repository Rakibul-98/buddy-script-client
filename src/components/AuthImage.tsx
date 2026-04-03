import Image from "next/image";

interface AuthImageProps {
  src: string;
  alt: string;
  variant?: "login" | "registration";
}

export default function AuthImage({ src, alt, variant }: AuthImageProps) {

  return (
    <div>
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        className={`w-full h-auto object-contain ${variant == "registration" && "lg:scale-120"}`}
        priority
      />
    </div>
  );
}