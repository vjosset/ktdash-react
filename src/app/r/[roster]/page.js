import React from "react";
import Roster from "@/page/roster";

export default async function RosterRoute({
    params
  }) {
    const rosterId = (await params).roster;

    return (
        <Roster rosterId={rosterId} />
    );
}
