import "./globals.css";

export const metadata = {
  title: "Pieach CMS",
  description: "Admin Dashboard for Pieach",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
