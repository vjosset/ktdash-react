'use client'
import { Container, Image, LoadingOverlay, SimpleGrid, Stack, Tabs, Text, Title } from "@mantine/core";
import OperativeCard from "../../components/operative-card";
import { modals } from '@mantine/modals';
import { groupBy } from "lodash";
import PloyCards from "../../components/ploy-cards";
import EquipmentCards from "../../components/equipment-cards";
import TacOpCards from "../../components/tacop-cards";
import { IconListCheck } from "@tabler/icons-react";
import React from "react";
import { useAppContext } from "../../hooks/app-context";

export default function Team(props) {
    const { appState, setAppState } = useAppContext();
    const { killteam } = props;
    const showTeamComp = () =>
        modals.open({
            size: "lg",
            title: 'Team Composition',
            children: (
                <span dangerouslySetInnerHTML={{ __html: `${killteam?.killteamcomp}` }} />
            ),
        });
    React.useEffect(() => {
        setAppState({
            ...appState,
            contextActions: [
                {
                    icon: <IconListCheck />,
                    text: "Team Composition",
                    onClick: () => showTeamComp()
                }
            ]
        });
        return () => {
            setAppState({
                ...appState,
                contextActions: []
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [killteam]);
    if (!killteam) {
        return;
    }
    const isNarrativeEquipment = (equip) => equip.eqid.includes('BS-') || equip.eqid.includes('BH-');
    const groupedEquipment = groupBy(killteam.equipments.filter(equip => !isNarrativeEquipment(equip)), 'eqcategory');
    return (
        <Container py="md" px="md" fluid>
            <Stack>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <Image onClick={() => modals.open({
                        size: "xl",
                        title: <Title order={2}>{killteam.killteamname}</Title>,
                        children: <Image
                            fit="cover"
                            style={{ objectPosition: "top" }}
                            radius="sm"
                            src={`https://ktdash.app/img/portraits/${killteam?.factionid}/${killteam?.killteamid}/${killteam?.killteamid}.jpg`}
                        />
                    })} fit="cover" style={{ objectPosition: "top", cursor: "pointer" }} h={300} radius="sm" src={`https://ktdash.app/img/portraits/${killteam?.factionid}/${killteam?.killteamid}/${killteam?.killteamid}.jpg`} />
                    <Stack justify="flex-start" align="flex-start">
                        <Title>
                            {killteam?.killteamname} <sup>{killteam.edition}</sup>
                        </Title>
                        <Text>
                            <span dangerouslySetInnerHTML={{ __html: `${killteam.description}` }} />
                        </Text>
                    </Stack>
                </SimpleGrid>
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
                        <Tabs.Tab value="tacops">
                            TacOps
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="operatives">
                        <Stack my="md">
                            {killteam?.fireteams?.map((fireteam) => (
                                <>
                                    {!!(killteam?.fireteams?.length > 1) && <Title order={2}>{fireteam.fireteamname}</Title>}
                                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="md">
                                        {fireteam?.operatives?.map((operative) => (
                                            <OperativeCard operative={operative} />
                                        ))}
                                    </SimpleGrid>
                                </>
                            ))}
                        </Stack>
                    </Tabs.Panel>
                    <Tabs.Panel value="ploys">
                        <PloyCards killteam={killteam} />
                    </Tabs.Panel>
                    <Tabs.Panel value="equipment">
                        <EquipmentCards equipment={groupedEquipment} />
                    </Tabs.Panel>
                    <Tabs.Panel value="tacops">
                        <TacOpCards tacops={killteam.tacops} />
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </Container>
    );
}
