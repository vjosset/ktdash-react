import { useRoute } from "wouter";
import { useRequest } from "../../hooks/use-api";
import { Box, Button, Container, Image, LoadingOverlay, SimpleGrid, Stack, Tabs, Text, Title } from "@mantine/core";
import OperativeCard from "../../components/operative-card";
import { modals } from '@mantine/modals';
import { groupBy } from "lodash";
import PloyCards from "../../components/ploy-cards";
import EquipmentCards from "../../components/equipment-cards";
import TacOpCards from "../../components/tacop-cards";

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
            size: "lg",
            title: 'Team Composition',
            children: (
                <div dangerouslySetInnerHTML={{ __html: `${killteam.killteamcomp}` }} />
            ),
        });
    const isNarrativeEquipment = (equip) => equip.eqid.includes('BS-') || equip.eqid.includes('BH-');
    const groupedEquipment = groupBy(killteam.equipments.filter(equip => !isNarrativeEquipment(equip)), 'eqcategory');
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
                        <Tabs.Tab value="tacops">
                            TacOps
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
