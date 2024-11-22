import { activityTypes } from "@/utils/routes";
import TodayPageDisplay from "../components/TodayPageDisplay";
import { Group, Stack } from "@mantine/core";
import Countdown from "../components/Countdown";
import { Masonry } from "@mui/lab";
import { getAllData } from "@/data/data-fetchers";

export default async function HomePage() {
  const { rotations } = await getAllData();

  return (
    <Stack>
      <Group justify="center">
        <Countdown title="Weekly Reset" to="weekly-reset" />
        <Countdown title="Daily Reset" to="daily-reset" />
      </Group>
      <Masonry columns={2} spacing="16px" suppressHydrationWarning>
        {activityTypes.map((activityType) => (
          <TodayPageDisplay
            key={activityType.type}
            title={activityType.title}
            rotations={rotations.activityRotations.filter(
              (rotation) => rotation.activityType === activityType.type
            )}
            disableLinks={activityType.disableLinks}
          />
        ))}
      </Masonry>
    </Stack>
  );
}
