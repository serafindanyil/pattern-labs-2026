"use client";

import * as React from "react";

import "@/shared/api/generated-api";

import { StoreProvider } from "@/shared/store/provider";
import { ThemeProvider, ToasterProvider } from "@/shared/providers";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ToasterProvider>{children}</ToasterProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
