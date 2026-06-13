import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { volunteerAction } from "@/lib/actions";
import { HandHeart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteer"
};

const interests = ["Yard Signs", "Door Knocking", "Phone Calls", "Event Assistance", "Social Media"];

export default async function VolunteerPage({
  searchParams
}: Readonly<{ searchParams: Promise<{ success?: string }> }>) {
  const params = await searchParams;
  return (
    <>
      <PageHero
        title="Volunteer"
        intro="Help bring Renee's message of experience, respect, authenticity, and fairness to voters across Grant Parish."
        compact
      />
      <Section className="bg-white">
        <div className="container grid gap-6 md:gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-md bg-primary p-5 text-primary-foreground shadow-judicial md:p-8">
            <HandHeart className="size-10 text-secondary" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-3xl font-semibold md:text-4xl">Join the Work</h2>
            <p className="mt-4 leading-7 text-primary-foreground/82">
              Yard signs, calls, events, social media, and neighbor-to-neighbor conversations all matter.
            </p>
            <div className="mt-6 grid gap-3">
              {interests.slice(0, 3).map((interest) => (
                <div key={interest} className="border-l-4 border-secondary bg-white/8 px-4 py-3 text-sm font-semibold">
                  {interest}
                </div>
              ))}
            </div>
            {params.success ? (
              <p className="mt-6 rounded-md border border-secondary bg-white p-4 font-semibold text-primary">Thank you. The campaign has received your volunteer form.</p>
            ) : null}
          </div>
          <Card className="border-primary/12 shadow-sm">
            <CardHeader>
              <CardTitle>Volunteer Signup</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={volunteerAction} className="flex flex-col gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" />
                  </div>
                </div>
                <fieldset className="flex flex-col gap-3">
                  <legend className="text-sm font-semibold">Areas of Interest</legend>
                  <div className="grid gap-3 md:grid-cols-2">
                    {interests.map((interest) => (
                      <label key={interest} className="flex items-center gap-3 rounded-md border bg-background p-3 text-sm font-semibold transition-colors hover:bg-muted">
                        <input name="interests" value={interest} type="checkbox" className="size-4 accent-[#0F2D52]" />
                        {interest}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <Button type="submit">Submit Volunteer Form</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
