import React from "react";
import Factions from "@/page/factions";
import { fetchFactions } from "@/hooks/use-api/fetchers";

export async function generateMetadata() {
    return {
    title: 'Factions | KTDash.app',
    description: 'All KillTeam factions',
    openGraph: {
        title: 'Factions | KTDash.app',
        url: 'https://ktdash.app/allfactions',
        description: 'All KillTeam factions',
        images: ['https://ktdash.app/img/og/Compendium.png'],
        type: 'website'
    }
    }
}

export default async function FactionsRoute() {
    const factions = await fetchFactions('/faction.php');
    return (
        <Factions factions={factions} />
    );
}
