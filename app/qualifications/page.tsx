import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { campaign } from "@/content/campaign";
import { Award, BriefcaseBusiness, GraduationCap, Scale } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qualifications"
};

export default function QualificationsPage() {
  return (
    <>
      <PageHero
        title="Qualifications"
        intro="A focused record of education, licensure, prosecution work, private practice, and courtroom experience."
      />
      <Section className="bg-white">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["33 Years", "Practicing law", Scale],
              ["1992", "LSU Law graduate", GraduationCap],
              ["1993", "Admitted to practice", Award],
              ["Career", "Prosecutor and private practice", BriefcaseBusiness]
            ].map(([stat, label, Icon]) => (
              <Card key={String(stat)} className="border-primary/12">
                <CardHeader>
                  <Icon className="size-8 text-secondary" aria-hidden="true" />
                  <CardTitle className="text-3xl md:text-4xl">{String(stat)}</CardTitle>
                  <p className="text-sm font-semibold text-muted-foreground">{String(label)}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading title="Education" intro="A foundation in psychology, law, and social work." />
            <Card>
              <CardContent className="p-6">
                <ul className="flex flex-col gap-3">
                  {campaign.education.map((item) => (
                    <li key={item} className="border-b pb-3 text-muted-foreground last:border-b-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-5">
            {campaign.qualifications.map((item) => (
              <Card key={`${item.year}-${item.title}`} className="border-l-4 border-l-secondary">
                <CardHeader>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">{item.year}</p>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
