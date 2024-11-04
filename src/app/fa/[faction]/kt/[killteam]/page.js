import React from "react";
import { request } from "@/hooks/use-api";
import Team from "@/page/team";

export default async function FactionRoute({
    params
  }) {
    const factionId = (await params).faction;
    const killteamId = (await params).killteam;
    const killteam = await request(`/killteam.php?fa=${factionId}&kt=${killteamId}`)

    return (
        <Team killteam={killteam} />
    );
}