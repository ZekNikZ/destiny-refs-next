"use client";

import { Card, Stack, Text, Title } from "@mantine/core";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  title: string;
  to: "weekly-reset" | "daily-reset";
}

export default function Countdown(props: Props) {
  const [timeString, setTimeString] = useState("");

  const intervalRef = useRef<NodeJS.Timeout>();

  const to = useMemo(() => {
    const now = dayjs();

    let nextWeeklyReset = now.utc().day(2).hour(17).minute(0).second(0);
    if (now.isAfter(nextWeeklyReset)) {
      nextWeeklyReset = nextWeeklyReset.add(7, "days");
    }

    let nextDailyReset = now.utc().startOf("day").hour(17).minute(0).second(0);
    if (now.isAfter(nextDailyReset)) {
      nextDailyReset = nextDailyReset.add(1, "day");
    }

    return props.to === "weekly-reset" ? nextWeeklyReset : nextDailyReset;
  }, [props.to]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const now = dayjs();
      const diff = to.diff(now);
      const duration = dayjs.duration(diff);
      setTimeString(duration.format("D[d] H[h] m[m] s[s]"));
    });
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Card
      withBorder
      shadow="sm"
      padding="xs"
      radius="sm"
      style={{ flexGrow: 1, flexBasis: "350px" }}
    >
      <Stack gap="xs" align="center">
        <Title order={3} size="h3" ta="center">
          {props.title}
        </Title>
        <Text fw="bold">{timeString}</Text>
      </Stack>
    </Card>
  );
}
