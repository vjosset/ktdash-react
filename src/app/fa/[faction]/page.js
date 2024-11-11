import React from "react";
import { request } from "@/hooks/use-api";
import Faction from "@/page/faction";
import { SWRConfig } from "swr";
import { fetchFaction } from "@/hooks/use-api/fetchers";
import { SWRProvider } from "@/hooks/swr-provider";

export async function generateMetadata({ params }) {
  const factionId = (await params).faction;
  const faction = await request(`/faction.php?fa=${factionId}`);
  return {
    title: `${faction.factionname} | KTDash.app`,
    description: faction.description,
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
  const factionURL = `/faction.php?fa=${factionId}`;
  const faction = await fetchFaction(factionURL);
  const fallback = { [factionURL]: faction }
  return (
    <SWRProvider fallback={fallback}>
      <Faction faction={faction} />
    </SWRProvider>
  );
}