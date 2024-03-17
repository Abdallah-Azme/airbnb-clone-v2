import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        alt="Airbnb Logo"
        src="/images/logo.png"
        height={100}
        width={100}
      />
    </Link>
  );
}
