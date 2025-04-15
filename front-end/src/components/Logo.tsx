"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      {/* Light mode logo */}
      <Image
        src="/images/full_logo.png"
        alt="CampusSynergy Logo Light"
        width={150}
        height={50}
        className="block dark:hidden"
        priority
      />

      {/* Dark mode logo */}
      <Image
        src="/images/full_logo_white.webp"
        alt="CampusSynergy Logo Dark"
        width={150}
        height={50}
        className="hidden dark:block"
        priority
      />
    </Link>
  );
};

export default Logo;
