import { HoverCard, Image, Stack } from "@mantine/core";
import { Loot } from "@/data/types";
import LootItemIcon from "./LootItemIcon";
import LootListing from "./LootListing";
import { getLootKey, getUsableLoots } from "@/utils/loot";

interface Props {
  loot: Extract<Loot, { type: "group" }>;
  size: number;
  hideArtiface?: boolean;
  hideQuantity?: boolean;
}

export default function LootGroupIcon(props: Props) {
  return (
    <HoverCard shadow="md" closeDelay={25}>
      <HoverCard.Target>
        {props.loot.displayItemHash ? (
          <LootItemIcon
            loot={{ type: "item", itemHash: props.loot.displayItemHash }}
            size={props.size}
            hideQuantity={props.hideQuantity}
          />
        ) : (
          <div
            style={{
              width: props.size,
              height: props.size,
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Image
              src={`/icons/loot/${props.loot.displayStaticIcon ?? "legendary-engram"}.png`}
              alt={props.loot.groupType}
            />
            {!props.hideArtiface && props.loot.artiface && (
              <Image
                src="/icons/attributes/artiface.png"
                h="30%"
                w="30%"
                style={{ position: "absolute", right: 2, top: 2 }}
                alt="Artiface"
              />
            )}
            {!props.hideQuantity && props.loot.quantity && props.loot.quantity > 1 && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  background: "rgba(0, 0, 0, 0.6)",
                  height: 18,
                  display: "flex",
                  padding: "2px 6px",
                  color: "white",
                  lineHeight: "14px",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  borderTopLeftRadius: 6,
                }}
              >
                {props.loot.quantity}
              </div>
            )}
          </div>
        )}
      </HoverCard.Target>
      {props.loot.children.length > 0 && (
        <HoverCard.Dropdown p="sm">
          <Stack gap="xs" mah={320} style={{ overflowY: "auto", overflowX: "hidden" }}>
            {getUsableLoots(props.loot.children).map((loot) => (
              <LootListing
                loot={{
                  ...loot,
                  artiface: loot.artiface ?? props.loot.artiface,
                  quantity: loot.quantity ?? props.loot.quantity,
                }}
                key={getLootKey(loot)}
              />
            ))}
          </Stack>
        </HoverCard.Dropdown>
      )}
    </HoverCard>
  );
}
