import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Section, SectionHeading } from "@/components/section";
import { isAdminAuthenticated } from "@/lib/auth";
import { loginAction, logoutAction, saveEndorsementAction, saveEventAction, saveSettingAction } from "@/lib/actions";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function AdminPage({
  searchParams
}: Readonly<{ searchParams: Promise<{ error?: string }> }>) {
  const params = await searchParams;
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return (
      <Section>
        <div className="container max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Admin</CardTitle>
            </CardHeader>
            <CardContent>
              {params.error ? <p className="mb-4 text-sm font-semibold text-red-700">Invalid password.</p> : null}
              <form action={loginAction} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="username">Admin Username</Label>
                  <Input id="username" name="username" type="text" autoComplete="username" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <Input id="password" name="password" type="password" autoComplete="current-password" required />
                </div>
                <Button type="submit">Sign In</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    );
  }

  const [volunteers, contacts, events, endorsements, settings] = await Promise.all([
    prisma.volunteer.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.event.findMany({ orderBy: { startsAt: "asc" }, take: 20 }),
    prisma.endorsement.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.siteSetting.findMany({ orderBy: { key: "asc" } })
  ]);

  return (
    <Section>
      <div className="container">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <SectionHeading title="Campaign Admin" intro="Edit site content, manage events and endorsements, and review form submissions." />
          <form action={logoutAction}>
            <Button type="submit" variant="outline">Sign Out</Button>
          </form>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Add Event</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={saveEventAction} className="flex flex-col gap-4">
                <Input name="title" placeholder="Event title" required />
                <Input name="startsAt" type="datetime-local" required />
                <Input name="location" placeholder="Location" required />
                <Textarea name="description" placeholder="Description" required />
                <label className="flex items-center gap-3 text-sm font-semibold">
                  <input name="isPublished" type="checkbox" defaultChecked className="size-4 accent-[#0F2D52]" />
                  Published
                </label>
                <Button type="submit">Save Event</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Endorsement</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={saveEndorsementAction} className="flex flex-col gap-4">
                <Input name="name" placeholder="Name" required />
                <Input name="role" placeholder="Role or organization" required />
                <Input name="category" placeholder="Category" defaultValue="Community Supporter" />
                <Textarea name="quote" placeholder="Testimonial" required />
                <label className="flex items-center gap-3 text-sm font-semibold">
                  <input name="isPublished" type="checkbox" defaultChecked className="size-4 accent-[#0F2D52]" />
                  Published
                </label>
                <Button type="submit">Save Endorsement</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Editable Site Settings</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {settings.map((setting) => (
                <form key={setting.key} action={saveSettingAction} className="flex flex-col gap-3">
                  <Label htmlFor={setting.key}>{setting.key}</Label>
                  <input type="hidden" name="key" value={setting.key} />
                  <Textarea id={setting.key} name="value" defaultValue={setting.value} />
                  <Button type="submit" variant="outline">Save</Button>
                </form>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volunteer Signups</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button asChild variant="outline"><Link href="/admin/export/volunteers">Export CSV</Link></Button>
              {volunteers.map((volunteer) => (
                <div key={volunteer.id} className="border-b pb-3 text-sm last:border-b-0">
                  <p className="font-semibold">{volunteer.name}</p>
                  <p className="text-muted-foreground">{volunteer.email} {volunteer.phone ? `| ${volunteer.phone}` : ""}</p>
                  <p className="text-muted-foreground">{volunteer.interests}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button asChild variant="outline"><Link href="/admin/export/contacts">Export CSV</Link></Button>
              {contacts.map((contact) => (
                <div key={contact.id} className="border-b pb-3 text-sm last:border-b-0">
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-muted-foreground">{contact.email} {contact.phone ? `| ${contact.phone}` : ""}</p>
                  <p className="mt-2 text-muted-foreground">{contact.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Events</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {events.map((event) => (
                <p key={event.id} className="text-sm"><span className="font-semibold">{formatDate(event.startsAt)}</span> {event.title}</p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Endorsements</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {endorsements.map((endorsement) => (
                <p key={endorsement.id} className="text-sm"><span className="font-semibold">{endorsement.name}</span> {endorsement.category}</p>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
