import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.event.deleteMany();
  await prisma.endorsement.deleteMany();

  await prisma.event.createMany({
    data: [
      {
        title: "Grant Parish Meet and Greet",
        startsAt: new Date("2026-07-18T18:00:00-05:00"),
        location: "Grant Parish, Louisiana",
        description: "A community conversation with Renee Dugas Nugent. Details to be announced."
      },
      {
        title: "Campaign Volunteer Evening",
        startsAt: new Date("2026-08-06T17:30:00-05:00"),
        location: "Campaign Headquarters",
        description: "Help prepare yard signs, voter outreach materials, and event support."
      }
    ]
  });

  await Promise.all(
    [
      { key: "homepageHeadline", value: "Candidate for District Judge" },
      { key: "missionStatement", value: "A courtroom should be prepared, impartial, respectful, and rooted in the law." },
      {
        key: "donationDisclaimer",
        value:
          "Political contributions are subject to applicable campaign finance laws. Additional disclaimer language should be reviewed by campaign counsel."
      }
    ].map((setting) =>
      prisma.siteSetting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: setting
      })
    )
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
