import ActivityRotationDisplay from "@/components/rotations/ActivityRotationDisplay";
import { getAllData } from "@/data/data-fetchers";
import { Stack } from "@mantine/core";
import { Masonry } from "@mui/lab";

export default async function RotationsPage() {
  const { rotations, activities } = await getAllData();

  return (
    <Stack>
      <Masonry
        columns={{ xs: 1, lg: 2 }}
        spacing={2}
        suppressHydrationWarning
        defaultColumns={2}
        defaultHeight={2000}
        defaultSpacing={2}
        style={{ marginBottom: "-16px", marginRight: "-8px", width: "auto" }}
      >
        {rotations.activityRotations.map((rotation) => (
          <ActivityRotationDisplay key={rotation.id} rotation={rotation} activities={activities} />
        ))}
      </Masonry>
    </Stack>
  );
}
