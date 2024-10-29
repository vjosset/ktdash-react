import { Link, useLocation } from "wouter";
import { useAPI, useRequest } from "../../hooks/use-api";
import { ActionIcon, Card, Container, Group, LoadingOverlay, SimpleGrid, Stack, Tabs, Title } from "@mantine/core";
import OperativeCard from "../../components/operative-card";
import React from "react";
import { IconEdit, IconListCheck, IconMinus, IconPlus, IconRefresh, IconUserShare } from "@tabler/icons-react";
import useAuth from "../../hooks/use-auth";
import { useAppContext } from "../../hooks/app-context";
import { useLocalStorage } from "@mantine/hooks";
import { debounce, groupBy } from "lodash";
import PloyCards from "../../components/ploy-cards";
import EquipmentCards from "../../components/equipment-cards";
import TacOpCards from "../../components/tacop-cards";

export default function Dashboard() {
    const { user: userData } = useAuth();
    const api = useAPI();
    const { appState, setAppState } = useAppContext();
    const [dashboardRosterId] = useLocalStorage({ key: 'dashboardrosterid' });
    const { data: roster, isFetching: isFetchinigTeam, setData: setRoster } = useRequest(`/roster.php?rid=${dashboardRosterId}&loadrosterdetail=1`, {}, !!dashboardRosterId);
    const [, navigate] = useLocation();
    const canEdit = userData?.username === roster?.username;
    const killteam = roster?.killteam;
    const isNarrativeEquipment = (equip) => equip.eqid.includes('BS-') || equip.eqid.includes('BH-');
    const groupedEquipment = groupBy(roster?.rostereqs?.filter(equip => !isNarrativeEquipment(equip)), 'eqcategory');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSaveUpdateRoster = React.useCallback(debounce((newRoster) => {
        api.request(`/roster.php`, {
            method: "POST",
            body: JSON.stringify(newRoster)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 1000), []);
    const handleQuickUpdateRoster = React.useCallback((updates) => {
        const newRoster = {
            "userid": userData.userId,
            "rosterid": roster.rosterid,
            "rostername": roster.rostername,
            "factionid": roster.factionid,
            "killteamid": roster.killteamid,
            "seq": roster.seq,
            "notes": roster.notes,
            "CP": updates.CP ?? roster.CP,
            "TP": updates.TP ?? roster.TP,
            "VP": updates.VP ?? roster.VP,
            "RP": updates.RP ?? roster.RP,
            "ployids": roster.ployids,
            "portraitcopyok": roster.portraitcopyok,
            "keyword": roster.keyword,
            "reqpts": roster.reqpts,
            "stratnotes": roster.stratnotes,
            "eqnotes": roster.eqnotes,
            "specopnotes": roster.specopnotes
        };
        setRoster({
            ...roster,
            ...updates
        });
        handleSaveUpdateRoster(newRoster);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roster]);
    const handleSelectPloy = React.useCallback((ploy, checked) => {
        const newPloys = (checked ? [...(roster.ployids.split(',').filter((id) => !!id)), ploy.ployid] : [...(roster.ployids.split(',').filter((id) => !!id).filter((pl) => pl !== ploy.ployid))]);
        const newRoster = {
            "userid": userData.userId,
            "rosterid": roster.rosterid,
            "rostername": roster.rostername,
            "factionid": roster.factionid,
            "killteamid": roster.killteamid,
            "seq": roster.seq,
            "notes": roster.notes,
            "CP": roster.CP,
            "TP": roster.TP,
            "VP": roster.VP,
            "RP": roster.RP,
            "ployids": newPloys.join(','),
            "portraitcopyok": roster.portraitcopyok,
            "keyword": roster.keyword,
            "reqpts": roster.reqpts,
            "stratnotes": roster.stratnotes,
            "eqnotes": roster.eqnotes,
            "specopnotes": roster.specopnotes
        };
        setRoster({
            ...roster,
            ...newRoster
        });
        api.request(`/roster.php`, {
            method: "POST",
            body: JSON.stringify(newRoster)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roster]);
    const handleUpdateTacOp = React.useCallback((tacop) => {
        const newTacOp = {
            "userid": userData.userid,
            "rosterid": roster.rosterid,
            "tacopid": tacop.tacopid,
            "revealed": tacop.revealed,
            "VP1": tacop.VP1,
            "VP2": tacop.VP2
        };
        setRoster({
            ...roster,
            tacops: [...roster.tacops.map((op) => op.tacopid === tacop.tacopid ? tacop : op)]
        });
        api.request(`/rostertacop.php`, {
            method: !!tacop.active ? "POST" : "DELETE",
            body: JSON.stringify(newTacOp)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roster]);
    const handleSelectEquipment = React.useCallback((equipment, checked) => {
        const newEq = {
            "userid": userData.userid,
            "rosterid": roster.rosterid,
            "eqfactionid": equipment.factionid,
            "eqkillteamid": equipment.killteamid,
            "eqid": equipment.eqid
        };
        if (checked) {
            setRoster({
                ...roster,
                rostereqs: [...roster?.rostereqs?.map((eq) => eq.eqid === equipment.eqid ? ({ ...eq, selected: 1 }) : eq)]
            });
            api.request(`/rostereq.php`, {
                method: "POST",
                body: JSON.stringify(newEq)
            })
        } else {
            setRoster({
                ...roster,
                rostereqs: [...roster?.rostereqs?.map((eq) => eq.eqid === equipment.eqid ? ({ ...eq, selected: 0 }) : eq)]
            });
            api.request(`/rostereq.php`, {
                method: "DELETE",
                body: JSON.stringify(newEq)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roster]);
    const handleUpdateOperativeWounds = React.useCallback((operative, wounds) => {
        api.request(`/rosteropw.php?roid=${operative.rosteropid}&curW=${wounds}`, {
            method: "POST"
        }).then((data) => {
            if (data?.success) {
                setRoster({
                    ...roster,
                    operatives: roster.operatives?.map((op) => op.rosteropid === operative.rosteropid ? {
                        ...op,
                        curW: wounds
                    } : op)
                });
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roster]);
    React.useEffect(() => {
        setAppState({
            ...appState,
            contextActions: [
                ...(canEdit ? [
                    {
                        icon: <IconListCheck />,
                        text: "Select Operatives",
                        onClick: () => { }
                    },
                    {
                        icon: <IconUserShare />,
                        text: "Add Opponent",
                        onClick: () => { }
                    },
                    {
                        icon: <IconEdit />,
                        text: "Edit",
                        onClick: () => {
                            navigate(`/r/${dashboardRosterId}`)
                        }
                    },
                    {
                        icon: <IconRefresh />,
                        text: "Reset",
                        onClick: () => { }
                    }
                ] : [])
            ]
        });
        return () => {
            setAppState({
                ...appState,
                contextActions: []
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canEdit]);
    if (isFetchinigTeam) {
        return (<LoadingOverlay visible={isFetchinigTeam} />);
    }
    if (!roster) {
        return;
    }

    return (
        <Container py="md" px="md" fluid>
            <Stack>
                <Group gap={5} align="end">
                    <Title>
                        {roster?.rostername}
                    </Title>
                    <Link href={`/fa/${roster.factionid}/kt/${roster.killteamid}`}>{roster.killteamname}</Link>
                </Group>
                <Card>
                    <SimpleGrid cols={{ base: 3 }} spacing="sm" py="sm">
                        <Stack justify="center" align="center" gap="xs">
                            <Title order={3}>CP</Title>
                            <Group gap="xs">
                                <ActionIcon onClick={() => roster.CP !== 0 ? handleQuickUpdateRoster({ CP: roster.CP - 1 }) : () => { }} variant="default"><IconMinus /></ActionIcon>
                                {roster.CP.toString()}
                                <ActionIcon onClick={() => handleQuickUpdateRoster({ CP: roster.CP + 1 })} variant="default"><IconPlus /></ActionIcon>
                            </Group>
                        </Stack>
                        <Stack justify="center" align="center" gap="xs">
                            <Title order={3}>TURN</Title>
                            <Group gap="xs">
                                <ActionIcon onClick={() => roster.TP !== 0 ? handleQuickUpdateRoster({ TP: roster.TP - 1 }) : () => { }} variant="default"><IconMinus /></ActionIcon>
                                {roster.TP.toString()}
                                <ActionIcon onClick={() => handleQuickUpdateRoster({ TP: roster.TP + 1 })} variant="default"><IconPlus /></ActionIcon>
                            </Group>
                        </Stack>
                        <Stack justify="center" align="center" gap="xs">
                            <Title order={3}>VP</Title>
                            <Group gap="xs">
                                <ActionIcon onClick={() => roster.VP !== 0 ? handleQuickUpdateRoster({ VP: roster.VP - 1 }) : () => { }} variant="default"><IconMinus /></ActionIcon>
                                {roster.VP.toString()}
                                <ActionIcon onClick={() => handleQuickUpdateRoster({ VP: roster.VP + 1 })} variant="default"><IconPlus /></ActionIcon>
                            </Group>
                        </Stack>
                    </SimpleGrid>
                </Card>
                <Tabs defaultValue="operatives">
                    <Tabs.List grow>
                        <Tabs.Tab value="operatives">
                            Operatives
                        </Tabs.Tab>
                        <Tabs.Tab value="ploys">
                            Ploys
                        </Tabs.Tab>
                        {killteam.edition === "kt24" && <Tabs.Tab value="equipment">
                            Equipment
                        </Tabs.Tab>}
                        <Tabs.Tab value="tacops">
                            TacOps
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="operatives">
                        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} mt="md" spacing="md">
                            {roster?.operatives?.filter((op) => !op.hidden)?.map((operative) => (
                                <OperativeCard woundTracker onUpdateWounds={(wounds) => handleUpdateOperativeWounds(operative, wounds)} operative={operative} />
                            ))}
                        </SimpleGrid>
                    </Tabs.Panel>
                    <Tabs.Panel value="ploys">
                        <PloyCards selectable selectedPloys={roster.ployids} onSelect={handleSelectPloy} killteam={killteam} />
                    </Tabs.Panel>
                    {killteam.edition === "kt24" && <Tabs.Panel value="equipment">
                        <EquipmentCards selectable onSelect={handleSelectEquipment} equipment={groupedEquipment} />
                    </Tabs.Panel>}
                    <Tabs.Panel value="tacops">
                        <TacOpCards selectable tacops={roster.tacops} onUpdate={handleUpdateTacOp} />
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </Container>
    );
}
