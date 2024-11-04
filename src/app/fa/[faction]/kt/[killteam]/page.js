import React from "react";
import { request } from "@/hooks/use-api";
import Team from "@/page/team";

export async function generateMetadata({ params }) {
  const factionId = (await params).faction;
  const killteamId = (await params).killteam;
  const killteam = await request(`/killteam.php?fa=${factionId}&kt=${killteamId}`)
  return {
      openGraph: {
          title: `${killteam.killteamname} Kill Team (${killteam.edition}) | KTDash.app`,
          url: `https://ktdash.app/fa/${factionId}/kt/${killteam.killteamid}`,
          description: killteam.description,
          images: [`https://ktdash.app/img/portraits/${factionId}/${killteamId}/${killteamId}.jpg`],
          type: 'website'
      }
  }
}

export default async function FactionRoute({
    params
  }) {
    const factionId = (await params).faction;
    const killteamId = (await params).killteam;
    const killteam = await request(`/killteam.php?fa=${factionId}&kt=${killteamId}`)

    return (
        <Team killteam={killteam} />
    );
}