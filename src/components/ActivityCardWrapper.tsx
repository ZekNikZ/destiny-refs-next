"use client";

import { Activity } from "@/data/types";
import useRotation from "@/data/useRotation";
import { makeRouteFromActivity } from "@/utils/routes";
import ActivityCard from "./activity/ActivityCard";

interface Props {
  activity: Activity;
  disableLink?: boolean;
}

export default function ActivityCardWrapper(props: Props) {
  const [availability, loot] = useRotation(props.activity);
  const link = makeRouteFromActivity(props.activity);

  return (
    <ActivityCard
      key={props.activity.id}
      activity={{
        ...props.activity,
        loot: loot
          ? [{ type: "pool", quantity: 1, showInLootSummary: true, loot }]
          : props.activity.loot,
      }}
      availability={availability}
      forceState="summary"
      style={{ height: "100%" }}
      link={!props.disableLink ? link : undefined}
    />
  );
}
