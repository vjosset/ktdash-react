import React from "react";
import { request } from "@/hooks/use-api";
import Team from "@/page/team";
import { keyBy } from "lodash";
import customFactions from '@/data/compendium2024.json';

export async function generateMetadata({ params }) {
  const factionId = (await params).faction;
  const killteamId = (await params).killteam;
  const killteam = await request(`/killteam.php?fa=${factionId}&kt=${killteamId}`);
  const customTeamsByFaction = keyBy(customFactions, 'factionid');
  const customTeam = keyBy(customTeamsByFaction?.[factionId]?.killteams, 'killteamid')?.[killteamId];
  const isCustom = !!customTeam;
  const team = customTeam || killteam;
  return {
      openGraph: {
          title: `${team.killteamname} Kill Team (${team.edition}) | KTDash.app`,
          url: `https://ktdash.app/fa/${factionId}/kt/${team.killteamid}`,
          description: team.description,
          images: [`${!isCustom ? 'https://ktdash.app' : ''}/img/portraits/${factionId}/${killteamId}/${killteamId}.jpg`],
          type: 'website'
      }
  }
}

export default async function FactionRoute({
    params
  }) {
    const factionId = (await params).faction;
    const killteamId = (await params).killteam;
    const killteam = await request(`/killteam.php?fa=${factionId}&kt=${killteamId}`);
    const customTeamsByFaction = keyBy(customFactions, 'factionid');
    const customTeam = keyBy(customTeamsByFaction?.[factionId]?.killteams, 'killteamid')?.[killteamId];
    const isCustom = !!customTeam;
    const team = isCustom ? { ...customTeam, isCustom: true } : killteam;
    return (
        <Team killteam={team} />
    );
}