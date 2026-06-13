import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDonationDisclaimer } from "@/lib/public-data";
import { QrCode } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Donate"
};

export default async function DonatePage() {
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
      </Section>
    </>
  );
}
