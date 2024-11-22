"use client";

import { type RouteData } from "@/utils/routes";
import { Badge, Box, NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  route: RouteData;
  onClick?: (route: RouteData) => void;
}

export default function NavLinkWithChildren(props: Props) {
  const router = useRouter();

  const pathname = usePathname();

  const routeSelected = props.route.path === pathname;
  const routeOrSubrouteSelected = !!RegExp(`^${props.route.path}(/.*)?$`).test(pathname ?? "");

  return (
    <NavLink
      key={props.route.path}
      component={Link}
      href={props.route.path}
      label={
        <Box>
          {props.route.navbarProperties?.label ?? props.route.title}&nbsp;&nbsp;
          {props.route.navbarProperties?.beta && (
            <Badge
              color="red"
              radius="xs"
              display="inline-block"
              style={{
                paddingLeft: 2,
                paddingRight: 2,
                verticalAlign: "top",
              }}
            >
              Beta
            </Badge>
          )}
        </Box>
      }
      pl={12}
      leftSection={props.route.navbarProperties?.icon}
      variant={routeSelected ? "light" : "default"}
      active={routeSelected}
      onClick={() => {
        router.push(props.route.path);
        props.onClick?.(props.route);
      }}
      opened={!!pathname && routeOrSubrouteSelected}
    >
      {props.route.children
        ?.filter((subroute) => !subroute.navbarProperties?.hidden)
        .map((subroute) => {
          return (
            <NavLinkWithChildren key={subroute.path} route={subroute} onClick={props.onClick} />
          );
        })}
    </NavLink>
  );
}
