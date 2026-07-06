import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | OmegleUnlimited",
  description: "Get in touch with the OmegleUnlimited team for support, business inquiries, or feedback.",
  alternates: {
    canonical: "https://omegleunlimited.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
