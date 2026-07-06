import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { campaign } from "@/content/campaign";
import { ArrowRight, BookOpen, Church, GraduationCap, HeartHandshake, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Renee"
};

export default function AboutPage() {
  const storyMarkers = [
    ["Home", campaign.residence, MapPin],
    ["Faith", "Over 25 years at Crossroads Ministry Centre and active membership at HIS Church in Pineville", Church],
    ["Education", "Psychology, law, and social work training through Louisiana schools.", GraduationCap],
    ["Perspective", "A first-generation law school path shaped by work, family, and service.", HeartHandshake]
  ] as const;

  return (
    <>
      <PageHero
        title="About Renee"
        intro="A Central Louisiana story shaped by faith, family, work, education, and service."
        compact
      />
      <Section className="bg-white">
        <div className="container grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <div className="relative">
            <div className="absolute inset-5 bg-secondary/18" aria-hidden="true" />
            <Image
              src="/images/ABT_RNEE.jpg"
              alt="Renee Dugas Nugent"
              width={1024}
              height={1024}
              className="relative aspect-[4/5] w-full rounded-md object-cover shadow-judicial"
              priority
            />
          </div>
          <div className="border-l-4 border-secondary pl-5 md:pl-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Rooted in Central Louisiana</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight md:text-6xl">A Life Built Around People and Service</h2>
            <div className="mt-5 grid gap-4 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {campaign.biography.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/qualifications">
                  View Qualifications <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact the Campaign</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section className="fine-paper bg-background">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-4">
            {storyMarkers.map(([label, value, Icon]) => (
              <div key={label} className="border-l-4 border-secondary bg-white p-5 shadow-sm">
                <Icon className="size-7 text-secondary" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-2xl font-semibold">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">The Path Here</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight md:text-5xl">Early Life and Education</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Renee's background connects practical work, Louisiana schools, legal training, and social work into one public-service path.
            </p>
          </div>
          <div className="grid gap-4">
            {campaign.earlyLife.map((paragraph, index) => (
              <div key={paragraph} className="grid gap-4 border-l-4 border-secondary bg-background p-5 md:grid-cols-[3.5rem_1fr] md:items-start">
                <div className="font-serif text-3xl font-semibold text-secondary">0{index + 1}</div>
                <p className="text-base leading-7 text-muted-foreground md:text-lg md:leading-8">{paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-primary-foreground">
        <div className="container grid gap-5 md:grid-cols-2">
          <Card className="border-white/14 bg-white/8 text-primary-foreground">
            <CardHeader>
              <BookOpen className="size-8 text-secondary" aria-hidden="true" />
              <CardTitle>Why Renee Became an Attorney</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-primary-foreground/82">{campaign.whyAttorney}</p>
            </CardContent>
          </Card>
          <Card className="border-white/14 bg-white text-primary">
            <CardHeader>
              <HeartHandshake className="size-8 text-secondary" aria-hidden="true" />
              <CardTitle>Why She Is Running</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-muted-foreground">{campaign.whyRunning}</p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
