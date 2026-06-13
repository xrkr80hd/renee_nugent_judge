import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { campaign } from "@/content/campaign";
import { contactAction } from "@/lib/actions";
import { Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact"
};

export default async function ContactPage({
  searchParams
}: Readonly<{ searchParams: Promise<{ success?: string }> }>) {
  const params = await searchParams;
  return (
    <>
      <PageHero
        title="Contact the Campaign"
        intro="Questions, invitations, event requests, and campaign messages can be sent here."
        compact
      />
      <Section className="bg-white">
        <div className="container grid gap-6 md:gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-md bg-primary p-6 text-primary-foreground shadow-judicial">
            <Mail className="size-10 text-secondary" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-3xl font-semibold">Campaign Information</h2>
            <div className="mt-6 grid gap-4">
              <div className="border-l-4 border-secondary pl-4">
                <p className="font-semibold">Email</p>
                <p className="text-primary-foreground/78">{campaign.contact.email}</p>
              </div>
              <div className="border-l-4 border-secondary pl-4">
                <p className="font-semibold">Phone</p>
                <p className="text-primary-foreground/78">{campaign.contact.phone}</p>
              </div>
            </div>
          </div>
          <Card className="border-primary/12 shadow-sm">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {params.success ? (
                <p className="mb-5 rounded-md border border-secondary bg-background p-4 font-semibold">Thank you. Your message has been received.</p>
              ) : null}
              <form action={contactAction} className="flex flex-col gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required />
                </div>
                <Button type="submit">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
