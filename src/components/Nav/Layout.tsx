import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import TopNavigation from "./TopNavigation";

export const hubotSans = localFont({
    src: '../../../public/Hubot-Sans.woff2',
    variable: '--font-hubot-sans',
    weight: '700',
    declarations: [
        { prop: "font-stretch", value: "125%"}
    ],
    display: 'block',
    preload: true,
});

export const inter = Inter({
    display: 'block',
    subsets: ['cyrillic', 'latin'],
    preload: true,
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${hubotSans.variable} font-sans`} style={inter.style}>
        <header><TopNavigation/></header>
        <main>{children}</main>
    </div>
  );
}
