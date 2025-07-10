import {  Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import NotificationClientWrapper from "../../components/ui/NotificationClientWrapper";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese"], // ✅ BẮT BUỘC để hỗ trợ tiếng Việt
  weight: ["400", "500", "700"],
  variable: "--font-vietnam",
});
  
  
export const metadata = {
  title: "SM Bully Camp",
  description: "SM Bully Camp VN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body
        className={`${beVietnam.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
        <NotificationClientWrapper />
      </body>
    </html>
  );
}
