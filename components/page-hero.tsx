import { campaign } from "@/content/campaign";
import { cn } from "@/lib/utils";
import Image from "next/image";

type PageHeroProps = {
  title: string;
  intro: string;
  image?: {
    src: string;
    alt: string;
  };
  compact?: boolean;
};

export function PageHero({ title, intro, image, compact = false }: PageHeroProps) {
  return (
    <section className="civic-texture relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-x-0 bottom-0 h-px bg-secondary/60" aria-hidden="true" />
      <div className="absolute -left-28 top-16 hidden h-64 w-64 rounded-full border border-secondary/25 lg:block" aria-hidden="true" />
      <div
        className={cn(
          "container relative grid items-center gap-6 py-10 md:gap-10 md:py-16",
          image ? "lg:grid-cols-[1fr_0.66fr]" : "",
          compact && "md:py-12"
        )}
      >
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase leading-6 tracking-[0.18em] text-secondary md:text-sm">
            {campaign.court}
          </p>
          <h1
            className={cn(
              "mt-3 max-w-5xl font-serif text-4xl font-semibold leading-[1.02] md:mt-4",
              image ? "md:text-7xl" : "md:text-6xl"
            )}
          >
            {title}
          </h1>
          <p className="mt-4 max-w-3xl border-l-4 border-secondary pl-5 text-base leading-7 text-primary-foreground/82 md:mt-6 md:text-xl md:leading-8">
            {intro}
          </p>
        </div>
        {image ? (
          <div className="relative">
            <div className="absolute -inset-3 border border-secondary/50" aria-hidden="true" />
            <div className="absolute -bottom-5 -right-5 h-28 w-28 bg-secondary/20" aria-hidden="true" />
            <Image
              src={image.src}
              alt={image.alt}
              width={1024}
              height={1024}
              className="relative max-h-72 w-full rounded-md object-cover shadow-judicial md:max-h-none lg:aspect-[4/5]"
              priority
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
