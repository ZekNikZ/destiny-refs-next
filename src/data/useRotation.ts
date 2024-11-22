import dayjs from "dayjs";
import { Activity, ActivityAvailability, Loot } from "./types";
import { useGlobalData } from "./useGlobalData";
import { useMemo } from "react";

export default function useRotation(activity: Activity) {
  const {
    rotations: { activityRotations, challengeRotations },
    loot,
  } = useGlobalData();
  const date = dayjs().date();

  // Get double loot state
  const doubleLootActive = loot.doubleLootOverrides.includes(activity.id);
  const result = useMemo(() => {
    // Get featured state
    let featured: ActivityAvailability["featured"] = false;
    let loot: Loot[] | undefined;
    for (const rotation of activityRotations) {
      if (rotation.type === "newest" && rotation.activityId === activity.id) {
        featured = "newest";
        break;
      } else if (
        (rotation.type === "weekly" || rotation.type === "daily") &&
        rotation.rotation.some((set) => set.includes(activity.id))
      ) {
        let index: number = -1;
        const startDate = dayjs(rotation.startDate);
        switch (rotation.type) {
          case "daily":
            index = dayjs().diff(startDate, "day") % rotation.rotation.length;
            break;
          case "weekly":
            index = dayjs().diff(startDate, "week") % rotation.rotation.length;
            break;
        }

        if (rotation.rotation[index]?.includes(activity.id)) {
          featured = "active";

          // Get loot rotation
          if (rotation.lootRotation) {
            loot = rotation.lootRotation[index];
          }
        }

        break;
      }
    }

    // Get active challenge, if any
    const activeChallenges: string[] = [];
    for (const rotation of challengeRotations.filter(
      (rotation) => rotation.parentActivityId === activity.id
    )) {
      const startDate = dayjs(rotation.startDate);
      const index = dayjs().diff(startDate, "week") % rotation.rotation.length;

      activeChallenges.push(rotation.rotation[index]);
    }

    const availabilityResult = {
      featured,
      masterAvailable: !!(activity.hasMasterMode && featured),
      allChallengesActive: activity.type === "raid" && featured === "active",
      activeChallenges,
      doubleLootActive,
    } as ActivityAvailability;

    return [availabilityResult, loot] as const;
  }, [activity.id, activityRotations, challengeRotations, doubleLootActive, date]);

  return result;
}
