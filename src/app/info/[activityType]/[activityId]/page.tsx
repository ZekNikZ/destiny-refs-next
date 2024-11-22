import { getAllData } from "@/data/data-fetchers";
import { normalizeActivityName } from "@/utils/routes";

interface Props {
  params: Promise<{ activityType: string; activityId: string }>;
}

export async function generateStaticParams() {
  const { activities } = await getAllData();

  return activities.map((activity) => ({
    activityType: `${activity.type}s`,
    activityId: normalizeActivityName(activity),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { activityType, activityId } = await params;
  const { activities } = await getAllData();
  console.log(activities);
  const activity = activities.find(
    (activity) => activity.slug === `${activityType}/${activityId}`
  )!;
  console.log(`${activityType}/${activityId}`, activity);

  return {
    title: `${activity.name} | Destiny Refs`,
  };
}

export default async function Page({ params }: Props) {
  const { activityType, activityId } = await params;
  const { activities } = await getAllData();
  const activity = activities.find(
    (activity) => activity.slug === `${activityType}/${activityId}`
  )!;

  return <div>{activity.name}</div>;
}
