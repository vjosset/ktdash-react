import { keyBy, orderBy } from "lodash";
import { request } from ".";
import customFactions from '../../data/compendium2024.json';


export async function fetchFactions(url) {
    const factions = await request(url);
    const customTeamsByFaction = keyBy(customFactions, 'factionid');
    const mergedFactions = factions.map((faction) => {
        return {
            ...faction,
            killteams: faction?.killteams ? orderBy([...faction.killteams, ...(customTeamsByFaction?.[faction?.factionid]?.killteams || [])?.map((team) => ({ ...team, isCustom: true }))], ['edition', 'killteamname'], ['desc', 'asc']) : undefined
        }
    });
    return mergedFactions;
}

export async function fetchFaction(url) {
    const faction = await request(url);
    const customTeamsByFaction = keyBy(customFactions, 'factionid');
    const mergedFaction = {
        ...faction,
        killteams: orderBy([...faction.killteams, ...(customTeamsByFaction?.[faction?.factionid]?.killteams || [])?.map((team) => ({ ...team, isCustom: true }))], ['edition', 'killteamname'], ['desc', 'asc'])
    }
    return mergedFaction;
}

export async function fetchKillteam([, factionId, killteamId]) {
    const killteam = await request(`/killteam.php?fa=${factionId}&kt=${killteamId}`);
    const customTeamsByFaction = keyBy(customFactions, 'factionid');
    const customTeam = keyBy(customTeamsByFaction?.[factionId]?.killteams, 'killteamid')?.[killteamId];
    const isCustom = !!customTeam;
    const team = isCustom ? { ...customTeam, isCustom: true } : killteam;
    return team;
}

export async function fetchRoster([, rosterId]) {
    return await request(`/roster.php?rid=${rosterId}&loadrosterdetail=1`);
}