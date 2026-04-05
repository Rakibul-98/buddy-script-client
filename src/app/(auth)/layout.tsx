import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f0f2f5] relative py-12.5 md:py-25 px-3 sm:px-12 lg:px-30 min-h-screen">
      <Image
        src="/assets/shape1.svg"
        alt="Shape 1"
        height="175"
        width="175"
        className="absolute top-0 left-0 object-contain object-left max-lg:hidden z-0"
        priority
      />
      <Image
        src="/assets/shape2.svg"
        alt="Shape 2"
        height="475"
        width="575"
        className="absolute top-0 right-0 object-contain object-right max-lg:hidden z-0"
        priority
      />
      <Image
        src="/assets/shape3.svg"
        alt="Shape 3"
        height="275"
        width="375"
        className="absolute bottom-0 right-60 object-contain object-right max-lg:hidden z-0"
        priority
      />
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}