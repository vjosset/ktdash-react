import { Title, Text, Container, Card, Stack, Image, Group, Loader, Center, SimpleGrid } from "@mantine/core";
import classes from './home.module.css';
import { API_PATH, useRequest } from "../../hooks/use-api";
import { IconEye, IconFileImport, IconStar, IconStarFilled } from "@tabler/icons-react";
import { Link } from "wouter";
import News from "./news";
import useAuth from "../../hooks/use-auth";

export default function Home() {
    const { data: spotlight, isFetching: isFetchingSpotlight } = useRequest("/roster.php?randomspotlight=1");
    const { user } = useAuth();

    return (
        <Stack>
            <div className={classes.wrapper}>
                <div className={classes.inner}>
                    <Title className={classes.title}>
                        KTDash
                    </Title>

                    <Container className={classes.description} size={640}>
                        <Text>KTDash is a web-based application for running your KillTeam games.</Text>
                        <ul>
                            <li>Browse the <Link href="/allfactions">Factions</Link></li>
                            <li>{user?.username ? <Link href={`/u/${user?.username}`}>Build a roster</Link> : <>Build a roster</>} or <Link href="/u/KTDash">import a pre-built roster</Link></li>
                            <li>Generate names for your operatives</li>
                            <li>Use the <Link href="/dashboard">Dashboard</Link> to play your games and track operative wounds, TacOps, Ploys, operative orders and activation, TP/CP/VP, and more</li>
                        </ul>
                    </Container>
                </div>
            </div>
            {!!spotlight && <Container fluid>
                {!!isFetchingSpotlight && <Loader color="orange" />}
                <Card key={spotlight.factionid} radius="md" component="a" className={classes.card} href={`/r/${spotlight.rosterid}`}>
                    <Stack>
                        <Center>
                            <Title>Roster Spotlight</Title>
                        </Center>
                        <SimpleGrid cols={{ base: 1, md: 2 }}>
                            <Image style={{ height: '100%' }} radius="md" src={`${API_PATH}/rosterportrait.php?rid=${spotlight.rosterid}`} />
                            <SimpleGrid visibleFrom="md" cols={{ base: 2, md: 2, lg: 3, xl: 4 }}>
                                {spotlight.operatives.map((op) => (
                                    <Image style={{ height: '100%' }} radius="md" src={`${API_PATH}/operativeportrait.php?roid=${op.rosteropid}`} />
                                ))}
                            </SimpleGrid>
                        </SimpleGrid>
                        <Title order={2} mt={5}>{spotlight.rostername}</Title>
                        <Group>
                            <Text><Link href={`/fa/${spotlight.factionid}/kt/${spotlight.killteamid}`}>{spotlight.killteamname}</Link> by <Link href={`/u/${spotlight.username}`}>{spotlight.username}</Link></Text>
                        </Group>
                        <Group>
                            {!!spotlight.spotlight ? <IconStarFilled /> : <IconStar />}
                            <Group gap={5}><IconEye />{spotlight.viewcount.toString()}</Group>
                            <Group gap={5}><IconFileImport />{spotlight.importcount.toString()}</Group>
                        </Group>
                        <Text fs="italic">
                            {spotlight.operatives.map((operative) => operative.opname).join(', ')}
                        </Text>
                    </Stack>
                </Card>
            </Container>}
            <Container mb="md" fluid>
                <Card>
                    <Title>News</Title>
                    <News />
                </Card>
            </Container>
        </Stack>
    );
}
