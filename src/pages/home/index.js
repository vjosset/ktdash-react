import { Title, Text, Container, Card, Stack, Image, Group, Loader, Center } from "@mantine/core";
import classes from './home.module.css';
import { API_PATH, useRequest } from "../../hooks/use-api";
import { IconEye, IconFileImport, IconStar, IconStarFilled } from "@tabler/icons-react";
import { Link } from "wouter";
import News from "./news";

export default function Home() {
    const { data: spotlight, isFetching: isFetchingSpotlight } = useRequest("/roster.php?randomspotlight=1");

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
                            <li>Build your rosters or import a pre-built roster</li>
                            <li>Generate names for your operatives</li>
                            <li>Use the <Link href="/dashboard">Dashboard</Link> to play your games and track operative wounds, TacOps, Ploys, operative orders and activation, TP/CP/VP, and more</li>
                        </ul>
                    </Container>
                </div>
            </div>
            {!!spotlight && <Container my="md">
                <Center>
                <Title>Roster Spotlight</Title>
                </Center>
                {!!isFetchingSpotlight && <Loader color="orange" />}
                <Card key={spotlight.factionid} my="md" radius="md" component="a" className={classes.card} href={`/r/${spotlight.rosterid}`}>
                    <Stack>
                        <Image style={{ height: '300px' }} radius="md" src={`${API_PATH}/rosterportrait.php?rid=${spotlight.rosterid}`} />
                        <Title order={2} mt={5}>{spotlight.rostername}</Title>
                        <Group>
                            <Text><Link href={`/fa/${spotlight.factionid}/kt/${spotlight.killteamid}`}>{spotlight.killteamname}</Link> by <Link href={`/u/${spotlight.username}`}>{spotlight.username}</Link></Text>
                        </Group>
                        <Group>
                            {!!spotlight.spotlight ? <IconStarFilled stroke={1.5} /> : <IconStar stroke={1.5} />}
                            <Group gap={5}><IconEye stroke={1.5} />{spotlight.viewcount.toString()}</Group>
                            <Group gap={5}><IconFileImport stroke={1.5} />{spotlight.importcount.toString()}</Group>
                        </Group>
                        {!!spotlight.notes && <Text>
                            {spotlight.notes}
                        </Text>}
                        <Text fs="italic">
                            {spotlight.operatives.map((operative) => operative.opname).join(', ')}
                        </Text>
                    </Stack>
                </Card>
            </Container>}
            <Container fluid>
                <Title>News</Title>
                <News />
            </Container>
        </Stack>
    );
}
