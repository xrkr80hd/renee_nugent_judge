import { Section, SectionHeading } from "@/components/section";
import { ShareVideo } from "@/components/share-video";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { campaign } from "@/content/campaign";
import { getPublishedEvents } from "@/lib/public-data";
import { formatDate } from "@/lib/utils";
import { ArrowRight, CalendarDays, HandHeart, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reneefor35jdc.com";
const videoDescription = "Watch Renee Dugas Nugent's campaign video for District Judge of the 35th Judicial District Court in Grant Parish, Louisiana.";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Watch Renee Dugas Nugent's Campaign Video",
    description: campaign.seoDescription,
    type: "video.other",
    url: "/",
    images: [{ url: "/images/renee-video-poster.jpg", width: 1280, height: 720, alt: "Renee Dugas Nugent campaign video" }],
    videos: [{ url: new URL("/videos/renee-campaign.mp4", siteUrl).href, type: "video/mp4", width: 1280, height: 720 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch Renee Dugas Nugent's Campaign Video",
    description: campaign.seoDescription,
    images: ["/images/renee-video-poster.jpg"]
  }
};

export default async function HomePage() {
  const events = await getPublishedEvents(2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: "Renee Dugas Nugent Campaign Video",
          description: videoDescription,
          thumbnailUrl: new URL("/images/renee-video-poster.jpg", siteUrl).href,
          contentUrl: new URL("/videos/renee-campaign.mp4", siteUrl).href,
          url: new URL("/#campaign-video", siteUrl).href,
          uploadDate: "2026-09-28T20:31:00-05:00",
          duration: "PT1M59S",
          inLanguage: "en-US"
        }).replace(/</g, "\\u003c") }}
      />
      <section aria-label="Renee Dugas Nugent for Judge" className="bg-primary text-primary-foreground">
        <h1 className="sr-only">{campaign.name} for Judge — {campaign.court}</h1>
        <Image
          src="/images/renee-family-hero.jpg"
          alt="Renee Dugas Nugent with her family. For Judge. A New Era."
          width={1536}
          height={865}
          sizes="100vw"
          className="mx-auto block h-auto w-full max-w-[1536px]"
          priority
        />
        <div className="container flex flex-wrap items-center justify-center gap-3 py-4">
          <Button asChild variant="secondary"><Link href="/volunteer">Volunteer <ArrowRight aria-hidden="true" /></Link></Button>
          <Button asChild className="bg-white text-primary hover:bg-white/90"><Link href="/donate">Donate</Link></Button>
          <Button asChild variant="outline" className="border-white/35 bg-transparent text-white hover:bg-white/10"><Link href="/about">Learn More</Link></Button>
        </div>
      </section>

      <Section className="bg-background">
        <div id="campaign-video" className="container max-w-5xl scroll-mt-28">
          <h2 id="campaign-video-heading" className="mb-6 font-serif text-3xl font-semibold md:text-5xl">
            Watch Renee's Video
          </h2>
          <p className="mb-5 text-base leading-7 text-muted-foreground">{videoDescription}</p>
          <div className="aspect-video overflow-hidden rounded-lg border border-primary/15 bg-black shadow-judicial">
            <video
              src="/videos/renee-campaign.mp4"
              poster="/images/renee-video-poster.jpg"
              aria-label="Renee Dugas Nugent campaign video"
              className="h-full w-full border-0"
              autoPlay
              muted
              playsInline
              controls
              preload="metadata"
            >
              Your browser does not support embedded video.
            </video>
          </div>
          <ShareVideo />
          <p className="mt-1 text-sm text-muted-foreground">Video starts muted. Use the player controls to turn on sound.</p>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div className="border-l-4 border-secondary bg-background p-5 shadow-sm md:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Court Priorities</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight md:text-5xl">
              Renee's Priorities for the 35th Judicial District Court
            </h2>
          </div>
          <div className="grid gap-4">
            {[
              [
                "Support Responsible Term Limits",
                "Renee believes term limits promote accountability, encourage fresh perspectives, and help ensure public service remains focused on the people, not personal power."
              ],
              [
                "Work Toward Establishing a Drug Court",
                "Renee wants to explore implementing a Drug Court program that holds offenders accountable while providing a structured path toward treatment, recovery, and reduced repeat offenses."
              ],
              [
                "Improve Courtroom Efficiency",
                "Renee is committed to keeping cases moving efficiently through the court system. Delays affect families, victims, law enforcement, attorneys, and defendants alike. Justice delayed is justice denied."
              ]
            ].map(([title, body]) => (
              <div key={title} className="border-l-4 border-secondary bg-white p-5 shadow-sm">
                <h3 className="font-serif text-2xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

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
