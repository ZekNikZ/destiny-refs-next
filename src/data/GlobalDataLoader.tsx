import React from "react";
import { getAllData } from "./data-fetchers";
import GlobalDataClientLoader from "./GlobalDataClientLoader";

interface Props {
  children: React.ReactNode;
}

export default async function GlobalDataLoader({ children }: Props) {
  const data = await getAllData();
  return <GlobalDataClientLoader data={data}>{children}</GlobalDataClientLoader>;
}
