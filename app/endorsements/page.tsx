import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublishedEndorsements } from "@/lib/public-data";
import { Megaphone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Endorsements"
};

export default async function EndorsementsPage() {
  const endorsements = await getPublishedEndorsements();

  return (
    <>
      <PageHero
        title="Endorsements"
        intro="Public support will appear here once the campaign is ready to publish names, roles, and testimonials."
        compact
      />
      <Section className="bg-white">
        <div className="container">
          {endorsements.length === 0 ? (
            <Card className="border-primary/12 shadow-sm">
              <CardHeader>
                <Megaphone className="size-9 text-secondary" aria-hidden="true" />
                <CardTitle>Building Public Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-muted-foreground">
                  This page is ready for verified endorsements once they are approved for publication.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {endorsements.map((endorsement) => (
                <Card key={endorsement.id} className="border-primary/12">
                  <CardHeader>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">{endorsement.category}</p>
                    <CardTitle>{endorsement.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{endorsement.role}</p>
                  </CardHeader>
                  <CardContent>
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-semibold text-primary">Read testimonial</summary>
                      <p className="mt-4 leading-7 text-muted-foreground">"{endorsement.quote}"</p>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
