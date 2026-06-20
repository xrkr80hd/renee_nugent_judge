import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublishedEvents } from "@/lib/public-data";
import { formatDate } from "@/lib/utils";
import { CalendarDays, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events"
};

export default async function EventsPage() {
  const events = await getPublishedEvents();

  return (
    <>
      <PageHero
        title="Campaign Events"
        intro="Meet Renee, join the work, and help bring a fresh approach to Grant Parish."
      />
      <Section className="bg-white">
        <div className="container">
          {events.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {events.map((event) => (
                <Card key={event.id} className="border-primary/12">
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-secondary">
                      <CalendarDays className="size-5" aria-hidden="true" />
                      {formatDate(event.startsAt)}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="size-5" aria-hidden="true" />
                      {event.location}
                    </p>
                    <p className="leading-7 text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-primary/12">
              <CardContent className="py-8 text-center text-muted-foreground">
                No campaign events are published right now.
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
    </>
  );
}
