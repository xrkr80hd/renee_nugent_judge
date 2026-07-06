import { redirect } from "next/navigation";

export default function AdminAnalyticsPage() {
  const url =
    process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_URL ??
    "https://vercel.com/xrkr80hds-projects/renee-nugent-judge/analytics?environment=all";

  redirect(url);
}
