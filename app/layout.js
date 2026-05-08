import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";

export const metadata = {
  title: "Pieach CMS",
  description: "Admin Dashboard for Pieach",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
