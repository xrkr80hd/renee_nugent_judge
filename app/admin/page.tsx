import { Section, SectionHeading } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { deleteEndorsementAction, deleteEventAction, loginAction, logoutAction, moveEndorsementAction, moveEventAction, saveEndorsementAction, saveEventAction, saveSettingAction, updateVolunteerStatusAction } from "@/lib/actions";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

function toDateTimeLocal(value: Date) {
  return value.toISOString().slice(0, 16);
}

function settingValue(settings: Array<{ key: string; value: string }>, key: string) {
  return settings.find((setting) => setting.key === key)?.value ?? "Not set";
}

function AccordionSection({
  title,
  defaultOpen = false,
  children
}: Readonly<{ title: string; defaultOpen?: boolean; children: React.ReactNode }>) {
  return (
    <details className="rounded-md border bg-white [&[open]_.accordion-chevron]:rotate-180" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-serif text-xl font-semibold">
        <span>{title}</span>
        <ChevronDown className="accordion-chevron size-6 shrink-0 text-[#0F2D52] transition-transform duration-200" aria-hidden="true" />
      </summary>
      <div className="border-t px-6 py-6">{children}</div>
    </details>
  );
}

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
    prisma.event.findMany({ orderBy: [{ sortOrder: "asc" }, { startsAt: "asc" }], take: 20 }),
    prisma.endorsement.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }], take: 20 }),
    prisma.siteSetting.findMany({ orderBy: { key: "asc" } })
  ]);

  const publishedEvents = events.filter((event) => event.isPublished);
  const publishedEndorsements = endorsements.filter((endorsement) => endorsement.isPublished);

  return (
    <Section>
      <div className="container">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <SectionHeading title="Campaign Admin" intro="Edit site content, manage events and endorsements, and review form submissions." />
          <form action={logoutAction}>
            <Button type="submit" variant="outline">Sign Out</Button>
          </form>
        </div>

        <div className="grid gap-6">
          <AccordionSection title="Published on Site" defaultOpen>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-md border p-4 text-sm">
                <p className="font-semibold text-muted-foreground">Homepage Headline</p>
                <p className="mt-2 font-semibold">{settingValue(settings, "homepageHeadline")}</p>
                <p className="mt-4 font-semibold text-muted-foreground">Mission Statement</p>
                <p className="mt-2 leading-6">{settingValue(settings, "missionStatement")}</p>
              </div>
              <div className="rounded-md border p-4 text-sm">
                <p className="font-semibold text-muted-foreground">Published Events</p>
                {publishedEvents.length ? (
                  <div className="mt-3 flex flex-col gap-3">
                    {publishedEvents.map((event) => (
                      <div key={event.id}>
                        <p className="font-semibold">{event.title}</p>
                        <p className="text-muted-foreground">{formatDate(event.startsAt)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-muted-foreground">No events are currently published.</p>
                )}
              </div>
              <div className="rounded-md border p-4 text-sm">
                <p className="font-semibold text-muted-foreground">Published Endorsements</p>
                {publishedEndorsements.length ? (
                  <div className="mt-3 flex flex-col gap-3">
                    {publishedEndorsements.map((endorsement) => (
                      <div key={endorsement.id}>
                        <p className="font-semibold">{endorsement.name}</p>
                        <p className="text-muted-foreground">{endorsement.role}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-muted-foreground">No endorsements are currently published.</p>
                )}
              </div>
            </div>
          </AccordionSection>

          <AccordionSection title="Event Management" defaultOpen>
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
                  <Button type="submit">Save Event</Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-6 rounded-md border p-4">
              <h3 className="font-serif text-xl font-semibold">Posted Events</h3>
              <div className="mt-4 grid gap-4">
                {events.map((event, index) => (
                  <div key={event.id} className="rounded-md border p-4">
                    <form action={saveEventAction} className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                      <input type="hidden" name="id" value={event.id} />
                      <div className="flex flex-col gap-2 lg:col-span-2">
                        <Label htmlFor={`event-title-${event.id}`}>Event Title</Label>
                        <Input id={`event-title-${event.id}`} name="title" defaultValue={event.title} required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor={`event-startsAt-${event.id}`}>Date and Time</Label>
                        <Input id={`event-startsAt-${event.id}`} name="startsAt" type="datetime-local" defaultValue={toDateTimeLocal(event.startsAt)} required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor={`event-location-${event.id}`}>Location</Label>
                        <Input id={`event-location-${event.id}`} name="location" defaultValue={event.location} required />
                      </div>
                      <div className="flex flex-col gap-2 lg:col-span-2">
                        <Label htmlFor={`event-description-${event.id}`}>Description</Label>
                        <Textarea id={`event-description-${event.id}`} name="description" defaultValue={event.description} required />
                      </div>
                      <div className="flex flex-wrap gap-3 lg:col-span-2">
                        <Button type="submit" variant="outline">Edit Event</Button>
                      </div>
                    </form>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <form action={moveEventAction}>
                        <input type="hidden" name="id" value={event.id} />
                        <input type="hidden" name="direction" value="up" />
                        <Button type="submit" variant="outline" disabled={index === 0}>Move Up</Button>
                      </form>
                      <form action={moveEventAction}>
                        <input type="hidden" name="id" value={event.id} />
                        <input type="hidden" name="direction" value="down" />
                        <Button type="submit" variant="outline" disabled={index === events.length - 1}>Move Down</Button>
                      </form>
                      <form action={deleteEventAction}>
                        <input type="hidden" name="id" value={event.id} />
                        <Button type="submit" variant="outline">Delete Event</Button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AccordionSection>

          <AccordionSection title="Endorsement Management">
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
                  <Button type="submit">Save Endorsement</Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-6 rounded-md border p-4">
              <h3 className="font-serif text-xl font-semibold">Posted Endorsements</h3>
              <div className="mt-4 grid gap-4">
                {endorsements.map((endorsement, index) => (
                  <div key={endorsement.id} className="rounded-md border p-4">
                    <form action={saveEndorsementAction} className="grid gap-4">
                      <input type="hidden" name="id" value={endorsement.id} />
                      <div className="flex flex-col gap-2">
                        <Label htmlFor={`endorsement-name-${endorsement.id}`}>Name</Label>
                        <Input id={`endorsement-name-${endorsement.id}`} name="name" defaultValue={endorsement.name} required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor={`endorsement-role-${endorsement.id}`}>Role</Label>
                        <Input id={`endorsement-role-${endorsement.id}`} name="role" defaultValue={endorsement.role} required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor={`endorsement-category-${endorsement.id}`}>Category</Label>
                        <Input id={`endorsement-category-${endorsement.id}`} name="category" defaultValue={endorsement.category} required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor={`endorsement-quote-${endorsement.id}`}>Testimonial</Label>
                        <Textarea id={`endorsement-quote-${endorsement.id}`} name="quote" defaultValue={endorsement.quote} required />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button type="submit" variant="outline">Edit Endorsement</Button>
                      </div>
                    </form>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <form action={moveEndorsementAction}>
                        <input type="hidden" name="id" value={endorsement.id} />
                        <input type="hidden" name="direction" value="up" />
                        <Button type="submit" variant="outline" disabled={index === 0}>Move Up</Button>
                      </form>
                      <form action={moveEndorsementAction}>
                        <input type="hidden" name="id" value={endorsement.id} />
                        <input type="hidden" name="direction" value="down" />
                        <Button type="submit" variant="outline" disabled={index === endorsements.length - 1}>Move Down</Button>
                      </form>
                      <form action={deleteEndorsementAction}>
                        <input type="hidden" name="id" value={endorsement.id} />
                        <Button type="submit" variant="outline">Delete Endorsement</Button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AccordionSection>

          <AccordionSection title="Site Settings">
            <div className="grid gap-4 md:grid-cols-3">
              {settings.map((setting) => (
                <form key={setting.key} action={saveSettingAction} className="flex flex-col gap-3">
                  <Label htmlFor={setting.key}>{setting.key}</Label>
                  <input type="hidden" name="key" value={setting.key} />
                  <Textarea id={setting.key} name="value" defaultValue={setting.value} />
                  <Button type="submit" variant="outline">Save</Button>
                </form>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title="Volunteer Signups">
            <div className="grid gap-4 lg:grid-cols-2">
              {volunteers.map((volunteer) => (
                <div key={volunteer.id} className="rounded-md border p-4 text-sm">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="font-semibold text-muted-foreground">Name</p>
                      <p>{volunteer.name}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-muted-foreground">Email</p>
                      <p>{volunteer.email}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-muted-foreground">Phone</p>
                      <p>{volunteer.phone || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-muted-foreground">City</p>
                      <p>{volunteer.city || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="font-semibold text-muted-foreground">Volunteer For</p>
                    <p>{volunteer.interests}</p>
                  </div>
                  <form action={updateVolunteerStatusAction} className="mt-4 rounded-md border bg-muted/30 p-3">
                    <input type="hidden" name="id" value={volunteer.id} />
                    <p className="mb-2 font-semibold text-muted-foreground">Volunteer Status</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <label className="inline-flex items-center gap-2">
                        <input name="contacted" type="checkbox" defaultChecked={volunteer.contacted} className="size-4 accent-[#0F2D52]" />
                        Contacted
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input name="confirmed" type="checkbox" defaultChecked={volunteer.confirmed} className="size-4 accent-[#0F2D52]" />
                        Confirmed
                      </label>
                      <Button type="submit" variant="outline">Save Status</Button>
                    </div>
                  </form>
                </div>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title="Contact Submissions">
            <div className="grid gap-4 lg:grid-cols-2">
              {contacts.map((contact) => (
                <div key={contact.id} className="rounded-md border p-4 text-sm">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="font-semibold text-muted-foreground">Name</p>
                      <p>{contact.name}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-muted-foreground">Email</p>
                      <p>{contact.email}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-muted-foreground">Phone</p>
                      <p>{contact.phone || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="font-semibold text-muted-foreground">Message</p>
                    <p>{contact.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionSection>
        </div>
      </div>
    </Section>
  );
}
