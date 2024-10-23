import { useLocation } from "wouter";
import { useRequest } from "../../hooks/use-api";
import { ActionIcon, Card, Container, Group, LoadingOverlay, SimpleGrid, Stack, Tabs, Title } from "@mantine/core";
import OperativeCard from "../../components/operative-card";
import React from "react";
import { IconEdit, IconListCheck, IconMinus, IconPlus, IconRefresh, IconUserShare } from "@tabler/icons-react";
import useAuth from "../../hooks/use-auth";
import { useAppContext } from "../../hooks/app-context";
import { useLocalStorage } from "@mantine/hooks";
import { groupBy } from "lodash";
import PloyCards from "../../components/ploy-cards";
import EquipmentCards from "../../components/equipment-cards";

export default function Dashboard() {
    const { user: userData } = useAuth();
    const { appState, setAppState } = useAppContext();
    const [dashboardRosterId] = useLocalStorage({ key: 'dashboardrosterid' });
    const { data: roster, isFetching: isFetchinigTeam } = useRequest(`/roster.php?rid=${dashboardRosterId}&loadrosterdetail=1`, {}, !!dashboardRosterId);
    const [, navigate] = useLocation();
    const canEdit = userData?.username === roster?.username;
    const killteam = roster?.killteam;
    const isNarrativeEquipment = (equip) => equip.eqid.includes('BS-') || equip.eqid.includes('BH-') || equip.eqid.includes('RE-');
    const groupedEquipment = groupBy(killteam?.equipments?.filter(equip => !isNarrativeEquipment(equip)), 'eqcategory');
    const narrativeEquipment = groupBy(killteam?.equipments?.filter(isNarrativeEquipment), 'eqcategory');
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
                <Card>
                    <SimpleGrid cols={{ base: 3 }} spacing="sm" py="sm">
                        <Stack justify="center" align="center" gap="xs">
                            <Title order={3}>CP</Title>
                            <Group gap="xs"><ActionIcon variant="default"><IconMinus /></ActionIcon>{roster.CP}<ActionIcon variant="default"><IconPlus /></ActionIcon></Group>
                        </Stack>
                        <Stack justify="center" align="center" gap="xs">
                            <Title order={3}>TURN</Title>
                            <Group gap="xs"><ActionIcon variant="default"><IconMinus /></ActionIcon>{roster.TP}<ActionIcon variant="default"><IconPlus /></ActionIcon></Group>
                        </Stack>
                        <Stack justify="center" align="center" gap="xs">
                            <Title order={3}>VP</Title>
                            <Group gap="xs"><ActionIcon variant="default"><IconMinus /></ActionIcon>{roster.VP}<ActionIcon variant="default"><IconPlus /></ActionIcon></Group>
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
                        <Tabs.Tab value="equipment">
                            Equipment
                        </Tabs.Tab>
                        <Tabs.Tab value="campaign">
                            Narrative
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="operatives">
                        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} mt="md" spacing="md">
                            {roster?.operatives?.map((operative) => (
                                <OperativeCard operative={operative} />
                            ))}
                        </SimpleGrid>
                    </Tabs.Panel>
                    <Tabs.Panel value="ploys">
                        <PloyCards killteam={killteam} />
                    </Tabs.Panel>
                    <Tabs.Panel value="equipment">
                        <EquipmentCards equipment={groupedEquipment} />
                    </Tabs.Panel>
                    <Tabs.Panel value="campaign">
                        <EquipmentCards equipment={narrativeEquipment} />
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </Container>
    );
}
