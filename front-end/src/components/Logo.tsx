import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/full_logo.png"
        alt="CampusSynergy Logo"
        width={150}
        height={50}
      />
    </Link>
  );
};

export default Logo;
