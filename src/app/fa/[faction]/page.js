import React from "react";
import { request } from "@/hooks/use-api";
import Faction from "@/page/faction";
import { keyBy } from "lodash";
import customFactions from '@/data/compendium2024.json';

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
    const customTeamsByFaction = keyBy(customFactions, 'factionid');
    const mergedFaction = {
      ...faction,
      killteams: [ ...faction.killteams, ...(customTeamsByFaction?.[faction?.factionid]?.killteams || [])?.map((team) => ({ ...team, isCustom: true })) ]
    }
    return (
        <Faction faction={mergedFaction} />
    );
}