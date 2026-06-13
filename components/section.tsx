import { cn } from "@/lib/utils";

export function Section({
  children,
  className
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <section className={cn("py-8 sm:py-10 md:py-16 lg:py-20", className)}>{children}</section>;
}

export function SectionHeading({
  title,
  intro,
  align = "left"
}: Readonly<{ title: string; intro?: string; align?: "left" | "center" }>) {
  return (
    <div className={cn("mb-6 flex max-w-3xl flex-col gap-3 md:mb-10 md:gap-4", align === "center" && "mx-auto text-center")}>
      <h2 className="font-serif text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
      {intro ? <p className="text-base leading-7 text-muted-foreground md:text-lg md:leading-8">{intro}</p> : null}
    </div>
  );
}
