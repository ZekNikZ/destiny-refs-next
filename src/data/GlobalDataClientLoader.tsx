"use client";

import { useEffect } from "react";
import { LoadedJsonData } from "./json-types";
import { useGlobalData } from "./useGlobalData";

interface Props {
  data: LoadedJsonData;
  children: React.ReactNode;
}

export default function GlobalDataClientLoader({ data, children }: Props) {
  useEffect(() => {
    useGlobalData.setState(data);
  }, [data]);

  return children;
}
