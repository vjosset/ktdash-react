import React from "react";
import Gallery from "@/page/gallery";
import { request } from "@/hooks/use-api";

export default async function RosterRoute({
    params
  }) {
    const rosterId = (await params).roster;
    const roster = await request(`/roster.php?rid=${rosterId}&loadrosterdetail=1`);
    return (
        <Gallery roster={roster} rosterId={rosterId} />
    );
}