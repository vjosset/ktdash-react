import React from "react";
import { request } from "@/hooks/use-api";
import Factions from "@/page/factions";

export default async function FactionsRoute() {
    const factions = await request('/faction.php')

    return (
        <Factions factions={factions} />
    );
}
