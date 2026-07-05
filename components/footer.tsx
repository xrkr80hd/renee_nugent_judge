import { Logo } from "@/components/logo";
import { campaign } from "@/content/campaign";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xl text-sm leading-6 text-primary-foreground/78">
            Paid for by the Committee to Elect {campaign.name}. Content is prepared for campaign purposes and does not promise or predict rulings in any case.
          </p>
        </div>
        <div>
          <h2 className="mb-3 font-serif text-xl font-semibold">Campaign</h2>
          <ul className="flex flex-col gap-2 text-sm text-primary-foreground/80">
            <li><Link href="/about">About Renee</Link></li>
            <li><Link href="/qualifications">Qualifications</Link></li>
            <li><Link href="/judicial-philosophy">Judicial Philosophy</Link></li>
            <li><Link href="/events">Events</Link></li>
          </ul>
          <h2 className="mb-3 mt-6 font-serif text-xl font-semibold">Campaign Contact</h2>
          <ul className="flex flex-col gap-2 text-sm text-primary-foreground/80">
            <li>
              <a href={`tel:${campaign.contact.phone}`}>{campaign.contact.phone}</a>
            </li>
            <li>
              <a href={`mailto:${campaign.contact.email}`}>{campaign.contact.email}</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-serif text-xl font-semibold">Take Action</h2>
          <ul className="flex flex-col gap-2 text-sm text-primary-foreground/80">
            <li><Link href="/volunteer">Volunteer</Link></li>
            <li><Link href="/donate">Donate</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <h2 className="mb-3 mt-6 font-serif text-xl font-semibold">Election</h2>
          <p className="text-sm text-primary-foreground/80">{campaign.electionDate}</p>
          <p className="mt-2 text-sm text-primary-foreground/80">{campaign.court}</p>
        </div>
      </div>
      <div className="container pb-6 text-left text-xs text-primary-foreground/70">
        Made with love by <a href="http://xrkr80hd.studio" target="_blank" rel="noreferrer noopener" className="underline underline-offset-4 hover:text-primary-foreground">xrkr80hd designs</a>
      </div>
    </footer>
  );
}
