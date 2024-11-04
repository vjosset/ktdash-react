import React from "react";
import Rosters from "@/page/rosters";

export default async function RostersRoute({
    params
  }) {
    const username = (await params).user;

    return (
        <Rosters username={username} />
    );
}
