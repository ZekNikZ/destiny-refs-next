"use client";

import { useBungiePresentationNodeIcon } from "@/utils/bungie-api";
import { Image } from "@mantine/core";

interface Props {
  hash: number;
}

export default function BungiePresentationNodeIcon(props: Props) {
  const { data } = useBungiePresentationNodeIcon(props.hash);

  return <Image src={`https://www.bungie.net${data}`} alt="" style={{ width: 20, height: 20 }} />;
}
