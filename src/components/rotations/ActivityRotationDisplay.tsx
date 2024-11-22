"use client";

import { Box, Stack, Title } from "@mantine/core";
import { Activity, ActivityRotation } from "@/data/types";
import RotationEntry from "./RotationEntry";
import dayjs from "dayjs";
import { rotateArray } from "@/utils/arrays";

interface Props {
  rotation: ActivityRotation;
  activities: Activity[];
}

export default function ActivityRotationDisplay(props: Props) {
  function getActivitiesFromIds(activityIds: string[]): Activity[] {
    return activityIds
      .map((activityId) => props.activities.find((x) => x.id === activityId))
      .filter((x) => !!x);
  }

  switch (props.rotation.type) {
    case "weekly":
    case "daily":
      const startDate = dayjs(props.rotation.startDate);
      const startIndex = dayjs().diff(startDate, props.rotation.type === "weekly" ? "week" : "day");

      let rotation: string[][];
      switch (props.rotation.rotationLimit) {
        case "limited":
          rotation = props.rotation.rotation.slice(startIndex);
          break;
        case "infinite":
          rotation = rotateArray(props.rotation.rotation, startIndex);
          rotation = rotation.concat(rotation);
          break;
      }

      const lootRotation = props.rotation.lootRotation
        ? rotateArray(props.rotation.lootRotation, startIndex)
        : undefined;

      return (
        <Stack>
          <Title order={2} size="h2">
            {props.rotation.name}
          </Title>
          <Stack gap={0}>
            {rotation.map((activityIds, index) => {
              return (
                <RotationEntry
                  key={activityIds.join("|") + index}
                  date={startDate.add(
                    index + startIndex,
                    props.rotation.type === "weekly" ? "weeks" : "days"
                  )}
                  activities={getActivitiesFromIds(activityIds)}
                  loot={lootRotation ? lootRotation[index % lootRotation.length] : undefined}
                />
              );
            })}
          </Stack>
        </Stack>
      );
    case "newest":
      return (
        <Stack>
          <Title order={2} size="h2">
            {props.rotation.name}
          </Title>
          <Box>
            <RotationEntry activities={getActivitiesFromIds([props.rotation.activityId])} big />
          </Box>
        </Stack>
      );
  }
}
