import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://edgecloud.co.ke"),
  title: {
    default: "EdgeCloud Technologies | Kenya's Digital Enablement Cloud Agency",
    template: "%s | EdgeCloud Technologies",
  },
  description:
    "EdgeCloud Technologies builds, hosts, and secures compliant digital products for Kenyan and East African businesses. DPA-compliant cloud, M-Pesa native, Nairobi-based experts.",
  keywords: [
    "Kenya cloud hosting",
    "DPA compliant cloud",
    "M-Pesa integration",
    "Kenyan digital agency",
    "Eza Cloud",
    "ZuriMail",
    "WooCommerce Kenya",
    "managed Kubernetes Kenya",
  ],
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "EdgeCloud Technologies",
    title: "EdgeCloud Technologies – One Stack. Zero Pain. Full Trust.",
    description:
      "Kenya's digital enablement cloud agency. DPA-compliant, M-Pesa-native, Nairobi-based.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.png",
  },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://edgecloud.co.ke/#organization",
  name: "EdgeCloud Technologies",
  url: "https://edgecloud.co.ke",
  description:
    "Kenya's digital enablement cloud agency - designing, building, hosting, and securing compliant digital products.",
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
