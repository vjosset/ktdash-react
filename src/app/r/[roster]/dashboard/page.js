import React from "react";
import Dashboard from "@/page/dashboard";
import { request } from "@/hooks/use-api";

export default async function RosterRoute({
    params
  }) {
    const rosterId = (await params).roster;
    const roster = await request(`/roster.php?rid=${rosterId}&loadrosterdetail=1`);
    return (
        <Dashboard roster={roster} rosterId={rosterId} />
    );
}