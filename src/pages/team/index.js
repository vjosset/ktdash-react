import { useRoute } from "wouter";
import { useRequest } from "../../hooks/use-api";
import { Box, Button, Card, Container, Image, LoadingOverlay, SimpleGrid, Stack, Tabs, Text, Title } from "@mantine/core";
import { convertShapes } from "../../utils/shapes";
import OperativeCard from "../../components/operative-card";
import { modals } from '@mantine/modals';
import { groupBy } from "lodash";

export default function Faction() {
    const [, params] = useRoute("/fa/:factionId/kt/:killteamId");
    const { data: killteam, isFetching: isFetchinigTeam } = useRequest(`/killteam.php?fa=${params?.factionId}&kt=${params?.killteamId}`);
    if (isFetchinigTeam) {
        return (<LoadingOverlay visible={isFetchinigTeam} />);
    }
    if (!killteam) {
        return;
    }
    const showTeamComp = () =>
        modals.open({
            title: 'Team Composition',
            children: (
                <div dangerouslySetInnerHTML={{ __html: `${killteam.killteamcomp}` }} />
            ),
        });
    const isNarrativeEquipment = (equip) => equip.eqid.includes('BS-') || equip.eqid.includes('BH-') || equip.eqid.includes('RE-');
    const groupedEquipment = groupBy(killteam.equipments.filter(equip => !isNarrativeEquipment(equip)), 'eqcategory');
    const narrativeEquipment = groupBy(killteam.equipments.filter(isNarrativeEquipment), 'eqcategory');
    return (
        <Container py="md" px="md" fluid>
            <Stack>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <Image fit="cover" style={{ objectPosition: "top" }} h={300} radius="md" src={`/img/portraits/${params?.factionId}/${params?.killteamId}/${params?.killteamId}.jpg`} />
                    <Stack justify="flex-start" align="flex-start">
                        <Title>
                            {killteam?.killteamname}
                        </Title>
                        <Text>
                            <div dangerouslySetInnerHTML={{ __html: `${killteam.description}` }} />
                        </Text>
                        <Button onClick={showTeamComp}>Team Composition</Button>
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
                        <Tabs.Tab value="campaign">
                            Narrative
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="operatives">
                        <Box my="md">
                            {killteam?.fireteams?.map((fireteam) => (
                                <>
                                    {!!(killteam?.fireteams?.length > 1) && <Title order={3}>{fireteam.fireteamname}</Title>}
                                    <SimpleGrid mt="md" cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="md">
                                        {fireteam?.operatives?.map((operative) => (
                                            <OperativeCard operative={operative} />
                                        ))}
                                    </SimpleGrid>
                                </>
                            ))}
                        </Box>
                    </Tabs.Panel>

                    <Tabs.Panel value="ploys">
                        <Stack my="md">
                            <Title order={2}>Strategic Ploys</Title>
                            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                                {killteam?.ploys?.strat?.map((ploy) => (
                                    <Card>
                                        <Title order={3}>{ploy.ployname}</Title>
                                        <div dangerouslySetInnerHTML={{ __html: `${ploy.description}` }} />
                                    </Card>
                                ))}
                            </SimpleGrid>

                            <Title order={2}>Firefight Ploys</Title>
                            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                                {killteam?.ploys?.tac?.map((ploy) => (
                                    <Card>
                                        <Title order={3}>{ploy.ployname}</Title>
                                        <div dangerouslySetInnerHTML={{ __html: `${ploy.description}` }} />
                                    </Card>
                                ))}
                            </SimpleGrid>
                        </Stack>
                    </Tabs.Panel>
                    <Tabs.Panel value="equipment">
                        <Stack my="md">
                            {Object.keys(groupedEquipment)?.map((key) => {
                                const equipment = groupedEquipment[key];
                                return (
                                    <>
                                        <Title order={2}>{key}</Title>
                                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                                            {equipment.map((equip) => (
                                                <Card>
                                                    <Stack>
                                                        <Title order={3}>{equip.eqname}</Title>
                                                        <div dangerouslySetInnerHTML={{ __html: `${convertShapes(equip.eqdescription)}` }} />
                                                    </Stack>
                                                </Card>
                                            ))}
                                        </SimpleGrid>
                                    </>
                                )
                            })}
                        </Stack>
                    </Tabs.Panel>
                    <Tabs.Panel value="campaign">
                        <Stack my="md">
                            {Object.keys(narrativeEquipment)?.map((key) => {
                                const equipment = narrativeEquipment[key];
                                return (
                                    <>
                                        <Title order={2}>{key}</Title>
                                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                                            {equipment.map((equip) => (
                                                <Card>
                                                    <Stack>
                                                        <Title order={3}>{equip.eqname}</Title>
                                                        <div dangerouslySetInnerHTML={{ __html: `${convertShapes(equip.eqdescription)}` }} />
                                                    </Stack>
                                                </Card>
                                            ))}
                                        </SimpleGrid>
                                    </>
                                )
                            })}
                        </Stack>
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </Container>
    );
}
