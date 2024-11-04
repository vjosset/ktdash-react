import React from "react";
import { request } from "@/hooks/use-api";
import Faction from "@/page/faction";

export async function generateMetadata({ params }) {
  const factionId = (await params).faction;
  const faction = await request(`/faction.php?fa=${factionId}`);
  return {
      openGraph: {
          title: `${faction.factionname} | KTDash.app`,
          url: `https://ktdash.app/fa/${factionId}`,
          description: faction.description,
          images: [`https://ktdash.app/img/portraits/${factionId}/${factionId}.jpg`],
          type: 'website'
      }
  }
}

export default async function FactionRoute({
    params
  }) {
    const factionId = (await params).faction;
    const faction = await request(`/faction.php?fa=${factionId}`)

    return (
        <Faction faction={faction} />
    );
}