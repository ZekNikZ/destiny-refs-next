"use client";

import { useDisclosure } from "@mantine/hooks";
import { useAsideComponentContext } from "./AsideComponentContext";
import routes from "@/utils/routes";
import { AppShell, Group, Burger, ActionIcon, ScrollArea, Text } from "@mantine/core";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import NavLinkWithChildren from "./NavLinkWithChildren";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [opened, { toggle, close }] = useDisclosure();

  const { asideComponent } = useAsideComponentContext();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header p="sm">
        <Group align="center" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Group gap="xs" style={{ cursor: "pointer" }} align="end">
                <Text size="2.2rem" ff="Bebas Neue">
                  Destiny Refs
                </Text>
                <Text size="1.4rem" ff="Bebas Neue" c="blue" mb={2}>
                  by ZekNikZ
                </Text>
              </Group>
            </Link>
          </Group>
          <Group gap="xs">
            <ActionIcon
              variant="default"
              aria-label="Refresh data"
              size="lg"
              style={{ justifySelf: "end" }}
              component="a"
              href="https://github.com/ZekNikZ/destiny-refs"
              target="_blank"
            >
              <GithubLogo size="65%" />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <ScrollArea type="never">
          {routes
            .filter((route) => !route.navbarProperties?.hidden)
            .map((route) => (
              <NavLinkWithChildren
                route={route}
                key={route.path}
                onClick={(route) => {
                  if (!route.children) close();
                }}
              />
            ))}
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main pos="relative">{children}</AppShell.Main>

      {asideComponent && <AppShell.Aside>{asideComponent}</AppShell.Aside>}
    </AppShell>
  );
}
