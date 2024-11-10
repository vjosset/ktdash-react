import React from "react";
import { request } from "@/hooks/use-api";
import Team from "@/page/team";
import { keyBy } from "lodash";
import customFactions from '@/data/compendium2024.json';
import { fetchKillteam } from "@/hooks/use-api/fetchers";
import { unstable_serialize } from "swr";
import { SWRProvider } from "@/hooks/swr-provider";

export async function generateMetadata({ params }) {
  const factionId = (await params).faction;
  const killteamId = (await params).killteam;
  const killteam = await request(`/killteam.php?fa=${factionId}&kt=${killteamId}`);
  const customTeamsByFaction = keyBy(customFactions, 'factionid');
  const customTeam = keyBy(customTeamsByFaction?.[factionId]?.killteams, 'killteamid')?.[killteamId];
  const isCustom = !!customTeam;
  const team = customTeam || killteam;
  return {
    title: `${team.killteamname} Kill Team (${team.edition}) | KTDash.app`,
    description: team.description,
    openGraph: {
      title: `${team.killteamname} Kill Team (${team.edition}) | KTDash.app`,
      url: `https://ktdash.app/fa/${factionId}/kt/${team.killteamid}`,
      description: team.description,
      images: [`${!isCustom ? 'https://ktdash.app' : 'https://beta.ktdash.app'}/img/portraits/${factionId}/${killteamId}/${killteamId}.jpg`],
      type: 'website'
    }
  }
}

export default async function FactionRoute({
  params
}) {
  const factionId = (await params).faction;
  const killteamId = (await params).killteam;
  const team = await fetchKillteam([`/killteam.php`, factionId, killteamId]);
  const fallback = { [unstable_serialize(['/killteam.php', factionId, killteamId])]: team }
  return (
    <SWRProvider fallback={fallback}>
      <Team />
    </SWRProvider>
  );
}