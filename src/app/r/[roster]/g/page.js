import React from "react";
import Gallery from "@/page/gallery";
import { request } from "@/hooks/use-api";

export async function generateMetadata({ params }) {
  const rosterId = (await params).roster;
  const roster = await request(`/roster.php?rid=${rosterId}`);
  return {
    title: `${roster.rostername} by ${roster.username} - Gallery | KTDash.app`,
    description: `${roster.killteamname} KillTeam by ${roster.username}: ${roster.notes}`,
    openGraph: {
        title: `${roster.rostername} by ${roster.username} | KTDash.app`,
        url: `https://ktdash.app/r/${rosterId}/g`,
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
    const roster = await request(`/roster.php?rid=${rosterId}&loadrosterdetail=1`);
    return (
        <Gallery roster={roster} rosterId={rosterId} />
    );
}