import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { volunteerAction } from "@/lib/actions";
import { ChevronDown, HandHeart } from "lucide-react";
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
          <details className="rounded-md border border-primary/12 bg-white shadow-sm [&[open]_.accordion-chevron]:rotate-180" open>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-t-md bg-primary px-6 py-4 text-primary-foreground">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Secure Form</p>
                <h3 className="font-serif text-2xl font-semibold">Volunteer Signup</h3>
              </div>
              <ChevronDown className="accordion-chevron size-6 shrink-0 text-secondary transition-transform duration-200" aria-hidden="true" />
            </summary>
            <div className="p-6">
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
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor="address1">Street Address</Label>
                    <Input id="address1" name="address1" placeholder="123 Main St" required />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor="address2">Apt / Suite (Optional)</Label>
                    <Input id="address2" name="address2" placeholder="Apt 4B" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" placeholder="LA" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" name="zip" required />
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
            </div>
          </details>
        </div>
      </Section>
    </>
  );
}
