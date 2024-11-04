import React from "react";
import Gallery from "@/page/gallery";

export default async function RosterRoute({
    params
  }) {
    const rosterId = (await params).roster;

    return (
        <Gallery rosterId={rosterId} />
    );
}