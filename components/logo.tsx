import Link from "next/link";
import Image from "next/image";
import { campaign } from "@/content/campaign";

export function Logo() {
  return (
    <Link href="/" className="block shrink-0" aria-label={`${campaign.name} home`}>
      <Image
        src="/images/RD_JUDGE_CRNR.png"
        alt="Renee Dugas Nugent for District Judge"
        width={2048}
        height={680}
        className="h-auto w-[150px] sm:w-[190px] md:w-[240px] lg:w-[270px]"
        priority
      />
    </Link>
  );
}
