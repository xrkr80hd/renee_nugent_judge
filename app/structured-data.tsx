import { campaign } from "@/content/campaign";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: campaign.name,
    jobTitle: `Candidate for ${campaign.office}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Grant Parish",
      addressRegion: "LA",
      addressCountry: "US"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
