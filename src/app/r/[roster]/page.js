import React from "react";
import Roster from "@/page/roster";
import { request } from "@/hooks/use-api";
import useSWR, { unstable_serialize } from 'swr'
import { fetchRoster } from "@/hooks/use-api/fetchers";
import { SWRProvider } from "@/hooks/swr-provider";

export async function generateMetadata({ params }) {
  const rosterId = (await params).roster;
  const roster = await request(`/roster.php?rid=${rosterId}`);
  return {
    title: `${roster.rostername} by ${roster.username} | KTDash.app`,
    description: `${roster.killteamname} KillTeam by ${roster.username}: ${roster.notes}`,
    openGraph: {
      title: `${roster.rostername} by ${roster.username} | KTDash.app`,
      url: `https://ktdash.app/r/${rosterId}`,
      description: `${roster.killteamname} KillTeam by ${roster.username}: ${roster.notes}`,
      images: [`https://ktdash.app/api/rosterportrait.php?rid=${rosterId}`],
      type: 'website'
    }
  }
}

export default async function RosterRoute({
  params
}) {
  const rosterId = (await params).roster;
  const roster = await fetchRoster(['/roster.php', rosterId]);
  const fallback = { [unstable_serialize(['/roster.php', rosterId])]: roster }
  return (
    <SWRProvider fallback={fallback}>
      <Roster />
    </SWRProvider>
  );
}
