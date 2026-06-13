import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/section";
import { campaign } from "@/content/campaign";

export const metadata: Metadata = {
  title: "Judicial Philosophy"
};

export default function PhilosophyPage() {
  return (
    <>
      <PageHero
        title="Judicial Philosophy"
        intro="Fair. Firm. Respectful. Renee's campaign focuses on temperament, preparation, equal treatment, and fidelity to the law."
      />
      <Section className="bg-white">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2">
            {campaign.philosophy.map((item) => (
              <Card key={item.title} className="border-primary/12">
                <CardHeader>
                  <ShieldCheck className="size-9 text-secondary" aria-hidden="true" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-10 border-l-4 border-secondary bg-background p-6 text-sm leading-6 text-muted-foreground">
            Judicial ethics note: This campaign site describes values, experience, and approach. It does not commit Renee to any ruling, outcome, or position on a case that may come before the court.
          </p>
        </div>
      </Section>
    </>
  );
}
