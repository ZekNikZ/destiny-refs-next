import { getAllData } from "@/data/data-fetchers";
import Countdown from "@/components/Countdown";
import TodayPageDisplay from "@/components/TodayPageDisplay";
import { activityTypes } from "@/utils/routes";
import { Group, Stack } from "@mantine/core";
import { Masonry } from "@mui/lab";

export default async function HomePage() {
  const { rotations } = await getAllData();

  return (
    <Stack>
      <Group justify="center">
        <Countdown title="Weekly Reset" to="weekly-reset" />
        <Countdown title="Daily Reset" to="daily-reset" />
      </Group>
      <Masonry
        columns={{ xs: 1, lg: 2, xl: 3 }}
        spacing={2}
        suppressHydrationWarning
        defaultColumns={3}
        defaultHeight={2000}
        defaultSpacing={2}
        style={{ marginBottom: "-16px", marginRight: "-8px", width: "auto" }}
      >
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
