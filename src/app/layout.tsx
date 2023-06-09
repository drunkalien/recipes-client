"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "../redux/provider";
import { Container } from "@/shared/ui";
import { IKContext } from "imagekitio-react";
import { imageKit } from "../shared/configs/imageKitConfig";
import { Header } from "@/shared/ui/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <IKContext
          ikClient={imageKit}
          publicKey="public_TatTyIBt18yMljbpEbb1BgmYCpY="
          authenticationEndpoint="http://localhost:5000/image-auth"
          urlEndpoint="https://ik.imagekit.io/drunkalien/"
        >
          <Providers>
            <Header />
            <Container>{children}</Container>
          </Providers>
        </IKContext>
      </body>
    </html>
  );
}
