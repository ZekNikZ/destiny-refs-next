"use client";

import { type RouteData } from "@/utils/routes";
import { CaretDown, CaretRight } from "@phosphor-icons/react";
import { Badge, Box, Collapse, NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  route: RouteData;
  level?: number;
  onClick?: (route: RouteData) => void;
}

const NavLinkWithChildren = (props: Props) => {
  const pathname = usePathname();

  const routeSelected = !!RegExp(`^${props.route.path}$`).test(pathname);
  const routeOrSubrouteSelected = !!RegExp(`^${props.route.path}(/.*)?$`).test(pathname);

  return (
    <>
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
        rightSection={
          props.route.children?.filter((subroute) => subroute.navbarProperties) ? (
            pathname.startsWith(props.route.path) ? (
              <CaretDown size="0.8rem" />
            ) : (
              <CaretRight size="0.8rem" />
            )
          ) : null
        }
        variant={
          props.route.path === pathname || (routeSelected && !props.route.children)
            ? "light"
            : "default"
        }
        active={props.route.path === pathname || (routeSelected && !props.route.children)}
        onClick={() => {
          props.onClick?.(props.route);
        }}
      />
      {/* {props.route.children && (
        <Collapse
          key={`${props.route.path}-collapse`}
          in={routeOrSubrouteSelected}
          pl={12 * (props.level ?? 1)}
        >
          {props.route.children
            .filter((subroute) => !subroute.navbarProperties?.hidden)
            .map((subroute) => {
              return (
                <NavLinkWithChildren
                  key={subroute.path}
                  route={subroute}
                  level={(props.level ?? 1) + 1}
                  onClick={props.onClick}
                />
              );
            })}
        </Collapse>
      )} */}
    </>
  );
};

export default NavLinkWithChildren;
