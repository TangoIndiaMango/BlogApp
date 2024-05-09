import { Inter } from "next/font/google";
import "../style/styles.scss";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "Blog App System"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="container">
        <Header />
        {children}
      </body>
    </html>
  );
}
