import { activityTypes } from "@/utils/routes";

interface Props {
  params: Promise<{ activityType: string }>;
}

export async function generateStaticParams() {
  return activityTypes.map((type) => ({
    activityType: `${type.type}s`,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { activityType } = await params;
  const type = activityTypes.find((at) => activityType === `${at.type}s`)!;

  return {
    title: `${type.title} | Destiny Refs`,
  };
}

export default async function Page({ params }: Props) {
  const { activityType } = await params;
  const type = activityTypes.find((at) => activityType === `${at.type}s`)!;

  return <div>{type.title}</div>;
}
