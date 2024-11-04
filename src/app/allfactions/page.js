import React from "react";
import { request } from "@/hooks/use-api";
import Factions from "@/page/factions";

export async function generateMetadata() {
    return {
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
    const factions = await request('/faction.php')

    return (
        <Factions factions={factions} />
    );
}
