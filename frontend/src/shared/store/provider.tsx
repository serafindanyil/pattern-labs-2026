"use client";

import * as React from "react";
import { Provider } from "react-redux";

import { createStore } from "@/shared/store/store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = React.useState(createStore);

  return <Provider store={store}>{children}</Provider>;
}
