import { Section, SectionHeading } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { campaign } from "@/content/campaign";
import { getHomepageHeadline, getPublishedEvents } from "@/lib/public-data";
import { formatDate } from "@/lib/utils";
import { ArrowRight, CalendarDays, HandHeart, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const [events, headline] = await Promise.all([getPublishedEvents(2), getHomepageHeadline()]);

  return (
    <>
      <section className="civic-texture relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-x-0 top-0 h-1 bg-secondary" aria-hidden="true" />
        <div className="absolute -right-24 top-28 hidden h-72 w-72 rounded-full border border-secondary/30 lg:block" aria-hidden="true" />
        <div className="container flex min-h-[auto] flex-col gap-8 pb-8 pt-0 md:min-h-[720px] md:gap-10 md:py-10 lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-16">
          <div className="relative -mx-4 w-[calc(100%+2rem)] max-w-none sm:mx-auto sm:w-full sm:max-w-[610px] lg:order-2">
            <div className="absolute -inset-4 hidden border border-secondary/55 sm:block" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-lg bg-white shadow-judicial">
              <Image
                src="/images/RD_JUDGE.jpg"
                alt="Renee Dugas Nugent"
                width={1024}
                height={1024}
                className="aspect-[4/4.35] w-full rounded-none object-cover object-center sm:max-h-[560px] sm:rounded-lg md:aspect-[4/5]"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary via-primary/80 to-transparent p-6 pt-24">
                <div className="border-l-4 border-secondary pl-5">
                  <p className="font-serif text-4xl font-semibold">{campaign.slogan}</p>
                  <p className="mt-2 text-lg font-bold text-secondary">{campaign.secondarySlogan}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:gap-8 md:py-8 lg:order-1">
            <div className="flex flex-col gap-4 md:gap-5">
              <p className="max-w-full text-xs font-semibold uppercase leading-6 tracking-[0.12em] text-secondary sm:text-sm md:tracking-[0.2em]">
                {campaign.court}
              </p>
              <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[0.98] md:text-8xl md:leading-[0.94]">
                {campaign.name}
              </h1>
              <p className="max-w-2xl text-2xl font-semibold leading-tight text-secondary md:text-5xl">
                {headline}
              </p>
              <p className="max-w-2xl text-lg leading-8 text-primary-foreground/82 md:text-xl">{campaign.hero.body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/volunteer">
                  Volunteer <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/donate">Donate</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/35 bg-transparent text-white hover:bg-white/10">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {campaign.highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 border-l-2 border-secondary bg-white/8 px-4 py-3 text-sm font-semibold text-white">
                  <Scale className="size-5 text-secondary" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section className="fine-paper bg-background">
        <div className="container grid items-start gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="border-l-4 border-secondary bg-white/72 p-5 shadow-sm md:p-7">
            <h2 className="font-serif text-3xl font-semibold leading-tight md:text-5xl">A Fresh Approach for Grant Parish</h2>
            <div className="mt-4 grid gap-3 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              <p>
                Renee is running because she believes the courtroom should be prepared, respectful, and open to every person who appears before it.
              </p>
              <p>
                Raised in Central Louisiana and shaped by faith, family, work, and service, Renee brings a practical understanding of people and the law.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/about">Read Renee's Story</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/qualifications">View Qualifications</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ["Experience", "A legal career spanning prosecution, private practice, family matters, civil work, and public service."],
              ["Respect", "A courtroom temperament centered on listening carefully, staying prepared, and treating people with dignity."],
              ["Authenticity", "A campaign rooted in real Grant Parish relationships, not political theater or empty slogans."]
            ].map(([title, body]) => (
              <div key={title} className="border-l-4 border-secondary bg-white p-5 shadow-sm">
                <h3 className="font-serif text-2xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-primary-foreground">
        <div className="container grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <SectionHeading
              title="Fair. Firm. Respectful."
              intro="The judicial philosophy page gives voters the careful version. Here, the point is simple: temperament matters."
            />
            <Button asChild variant="secondary">
              <Link href="/judicial-philosophy">Read Her Philosophy</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {["Prepared before court starts", "Patient with every person", "Grounded in the law"].map((standard) => (
              <div key={standard} className="border-l-4 border-secondary bg-white/8 px-5 py-4 text-xl font-semibold">
                {standard}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container">
          <div>
            <SectionHeading
              title="Move the Campaign Forward"
              intro="Pick the path that fits: help reach voters, attend an event, or contribute through the dedicated donation page."
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Volunteer", "Yard signs, calls, events, and neighbor-to-neighbor outreach.", "/volunteer", HandHeart],
              ["Meet Renee", "See upcoming campaign events and community opportunities.", "/events", CalendarDays],
              ["Contribute", "Use the donation page for contribution details and payment options.", "/donate", Scale]
            ].map(([title, body, href, Icon]) => (
              <Card key={String(title)} className="border-primary/12 shadow-sm">
                <CardHeader>
                  <Icon className="size-8 text-secondary" aria-hidden="true" />
                  <CardTitle>{String(title)}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="leading-7 text-muted-foreground">{String(body)}</p>
                  <Button asChild variant="outline">
                    <Link href={String(href)}>Go</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-background">
        <div className="container">
          <SectionHeading title="Latest Campaign Updates" intro="Upcoming campaign events and community opportunities." />
          <div className="grid gap-5 md:grid-cols-2">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <p className="text-sm font-semibold text-secondary">{formatDate(event.startsAt)}</p>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
