import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";

function csvCell(value: unknown) {
  return `"${String(value ?? "").replaceAll("\"", "\"\"")}"`;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  const rows = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
  const csv = [
    ["Name", "Email", "Phone", "Message", "Created At"].map(csvCell).join(","),
    ...rows.map((row) => [row.name, row.email, row.phone, row.message, row.createdAt.toISOString()].map(csvCell).join(","))
  ].join("\n");

  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": "attachment; filename=contacts.csv"
    }
  });
}
