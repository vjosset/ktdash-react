import React from "react";
import Rosters from "@/page/rosters";
import { request } from "@/hooks/use-api";

export default async function RostersRoute({
    params
  }) {
    const username = (await params).user;
    const user = await request(`/user.php?username=${username}`);
    return (
        <Rosters username={username} user={user} />
    );
}
