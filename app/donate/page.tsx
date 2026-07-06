import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { donationSubmissionAction } from "@/lib/actions";
import { getDonationDisclaimer } from "@/lib/public-data";
import { QrCode } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Donate"
};

export default async function DonatePage({
  searchParams
}: Readonly<{ searchParams: Promise<{ success?: string }> }>) {
  const params = await searchParams;
  const disclaimer = await getDonationDisclaimer();

  return (
    <>
      <PageHero
        title="Donate"
        intro="Help fund a serious, voter-focused campaign for the Thirty-Fifth Judicial District Court."
        compact
      />
      <Section className="bg-white">
        <div className="container grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
          <div className="rounded-md border-l-4 border-secondary bg-background p-6">
            <h2 className="font-serif text-3xl font-semibold">Contribution Notice</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {disclaimer}
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Address details are required for campaign finance reporting and internal compliance tracking.
            </p>
          </div>
          <Card className="border-primary/12 shadow-sm">
            <CardHeader>
              <QrCode className="size-9 text-secondary" aria-hidden="true" />
              <CardTitle>Scan to Contribute</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-8">
              <div className="mx-auto max-w-xs rounded-md border bg-white p-4 md:max-w-none">
                <Image
                  src="/images/cashapp-qr.jpg"
                  alt="Cash App QR code for Renee Dugas Nugent campaign contributions"
                  width={900}
                  height={900}
                  className="h-auto w-full rounded-md"
                  priority
                />
              </div>
              <div className="border-l-4 border-secondary pl-5">
                <p className="text-lg leading-8 text-muted-foreground">
                  Use the QR code for campaign contributions. A full online checkout can be added later when the campaign payment account is ready.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="container mt-8">
          <Card className="border-primary/12 shadow-sm">
            <CardHeader>
              <CardTitle>Donor Reporting Form</CardTitle>
            </CardHeader>
            <CardContent>
              {params.success ? (
                <p className="mb-4 rounded-md border border-secondary bg-secondary/10 p-3 text-sm font-semibold text-primary">
                  Thank you. Your donor reporting details were submitted successfully.
                </p>
              ) : null}
              <form action={donationSubmissionAction} className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Full Name</Label>
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
                  <Label htmlFor="amount">Contribution Amount (Optional)</Label>
                  <Input id="amount" name="amount" placeholder="$100" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label htmlFor="address1">Street Address</Label>
                  <Input id="address1" name="address1" required />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label htmlFor="address2">Apt / Suite (Optional)</Label>
                  <Input id="address2" name="address2" />
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
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea id="notes" name="notes" placeholder="Any reporting notes or special instructions" />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit">Submit Donor Details</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
