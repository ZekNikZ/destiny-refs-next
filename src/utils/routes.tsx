import BungiePresentationNodeIcon from "@/components/BungiePresentationNodeIcon";
import { Activity, ActivityType } from "@/data/types";
import { type Icon } from "@phosphor-icons/react";
import {
  ArrowClockwise,
  Calendar,
  Gear,
  Info,
  Toolbox,
  TreasureChest,
} from "@phosphor-icons/react/dist/ssr";

export interface RouteData {
  path: string;
  title: string;
  navbarProperties?: {
    label?: string;
    icon?: React.ReactNode;
    hidden?: boolean;
    beta?: boolean;
  };
  children?: RouteData[];
}

function makePhosphorIcon(Icon: Icon) {
  return <Icon size={20} />;
}

export const activityTypes: {
  type: ActivityType;
  title: string;
  presentationNodeHash: number;
  backgroundImage: string;
  disableLinks?: boolean;
  dashboard?: boolean;
}[] = [
  {
    type: "raid",
    title: "Raids",
    presentationNodeHash: 3472409870,
    backgroundImage: "/images/raids/salvations-edge/banner.avif",
  },
  {
    type: "dungeon",
    title: "Dungeons",
    presentationNodeHash: 2196753074,
    backgroundImage: "/images/dungeons/vespers-host/banner.avif",
  },
  {
    type: "exotic_mission",
    title: "Exotic Missions",
    presentationNodeHash: 2916787939,
    backgroundImage: "/images/exotic_missions/zero-hour.avif",
    disableLinks: true,
    dashboard: true,
  },
  {
    type: "nightfall",
    title: "Nightfalls",
    presentationNodeHash: 1507864044,
    backgroundImage: "/images/nightfalls/liminality.avif",
    disableLinks: true,
  },
  {
    type: "lost_sector",
    title: "Lost Sectors",
    presentationNodeHash: 4111930674,
    backgroundImage: "/images/lost_sectors/sepulcher.avif",
    disableLinks: true,
  },
];

export function makeRouteFromActivity(activity: Activity) {
  const activityType = activityTypes.find((activityType) => activityType.type === activity.type);
  const dashboardPage = activityType?.disableLinks;

  if (dashboardPage) {
    return `/info/${activity.type}s`;
  } else {
    return `/info/${activity.type}s/${activity.name.toLowerCase().replace(/ /g, "-").replace(/'/g, "")}`;
  }
}

export function getRoutes(activities: Activity[]): RouteData[] {
  return [
    {
      path: "/",
      title: "Today",
      navbarProperties: {
        icon: makePhosphorIcon(Calendar),
      },
    },
    {
      path: "/rotations",
      title: "Rotations",
      navbarProperties: {
        icon: makePhosphorIcon(ArrowClockwise),
      },
    },
    {
      path: "/info",
      title: "Loot & Details",
      navbarProperties: {
        icon: makePhosphorIcon(TreasureChest),
      },
      children: activityTypes.map((activityType) => ({
        path: `/info/${activityType.type}s`,
        title: activityType.title,
        navbarProperties: {
          icon: <BungiePresentationNodeIcon hash={activityType.presentationNodeHash} />,
        },
        children: !activityType.disableLinks
          ? activities
              .filter((activity) => activity.type === activityType.type)
              .map((activity) => ({
                path: makeRouteFromActivity(activity),
                title: activity.name,
              }))
          : undefined,
      })),
    },
    {
      path: "/tools",
      title: "Tools",
      navbarProperties: {
        icon: makePhosphorIcon(Toolbox),
      },
      children: [
        {
          path: "/tools/vow-chest",
          title: "VOTD Deepsight Puzzle",
          navbarProperties: {
            hidden: true,
          },
        },
        {
          path: "/tools/kf-chest",
          title: "KF Deepsight Puzzle",
          navbarProperties: {
            hidden: true,
          },
        },
        {
          path: "/tools/se-verity",
          title: "SE Verity Helper",
        },
        {
          path: "/tools/raid-summary",
          title: "Fireteam Raid Summary",
          navbarProperties: {
            beta: true,
          },
        },
      ],
    },
    {
      path: "/contact",
      title: "Contact",
      navbarProperties: {
        icon: makePhosphorIcon(Info),
      },
    },
    {
      path: "/settings",
      title: "Settings",
      navbarProperties: {
        icon: makePhosphorIcon(Gear),
      },
    },
  ];
}
