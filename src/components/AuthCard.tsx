import Image from "next/image";
import Link from "next/link";
import GoogleSignInButton from "../app/Components/Auth/GoogleSignInButton";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  showGoogleButton?: boolean;
}

export default function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
  showGoogleButton = true,
}: AuthCardProps) {
  return (
    <div className="w-full lg:w-100 mx-auto lg:mx-0 bg-white z-50 p-12 rounded-sm">
      <div className="mb-12.5">
        <div className="relative w-40 h-10 mx-auto mb-7">
          <Image
            src="/assets/logo.svg"
            alt="logo Image"
            fill
            className="object-contain object-center"
            priority
          />
        </div>
        <p className="text-center mb-2">{subtitle}</p>
        <h2 className="text-center text-[28px] font-medium">{title}</h2>
      </div>

      {showGoogleButton && (
        <>
          <div className="mb-10">
            <GoogleSignInButton mode={footerLinkHref === "/login" ? "register" : "login"} />
          </div>

          <div className="flex items-center gap-10 mb-10">
            <div className="border h-0.5 w-full"></div>
            <p className="text-sm text-muted-foreground">Or</p>
            <div className="border h-0.5 w-full"></div>
          </div>
        </>
      )}

      {children}

      <div className="mt-15 text-center text-muted-foreground text-sm">
        <span>{footerText} </span>
        <Link
          href={footerLinkHref}
          className="text-[#1890FF] hover:text-[#1890FF]/95"
        >
          {footerLinkText}
        </Link>
      </div>
    </div>
  );
}