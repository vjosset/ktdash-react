import { useRoute } from "wouter";
import { useRequest } from "../../hooks/use-api";
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

export default function Faction() {
    const { appState, setAppState } = useAppContext();
    const [, params] = useRoute("/fa/:factionId/kt/:killteamId");
    const { data: killteam, isFetching: isFetchinigTeam } = useRequest(`/killteam.php?fa=${params?.factionId}&kt=${params?.killteamId}`);
    const showTeamComp = () =>
        modals.open({
            size: "lg",
            title: 'Team Composition',
            children: (
                <div dangerouslySetInnerHTML={{ __html: `${killteam?.killteamcomp}` }} />
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
    if (isFetchinigTeam) {
        return (<LoadingOverlay visible={isFetchinigTeam} />);
    }
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
                            radius="md"
                            src={`https://ktdash.app/img/portraits/${params?.factionId}/${params?.killteamId}/${params?.killteamId}.jpg`}
                        />
                    })} fit="cover" style={{ objectPosition: "top", cursor: "pointer" }} h={300} radius="md" src={`https://ktdash.app/img/portraits/${params?.factionId}/${params?.killteamId}/${params?.killteamId}.jpg`} />
                    <Stack justify="flex-start" align="flex-start">
                        <Title>
                            {killteam?.killteamname} <sup>{killteam.edition}</sup>
                        </Title>
                        <Text>
                            <div dangerouslySetInnerHTML={{ __html: `${killteam.description}` }} />
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
