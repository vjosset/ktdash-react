import React from "react";
import { request } from "@/hooks/use-api";
import Faction from "@/page/faction";

export default async function FactionRoute({
    params
  }) {
    const factionId = (await params).faction;
    const faction = await request(`/faction.php?fa=${factionId}`)

    return (
        <Faction faction={faction} />
    );
}