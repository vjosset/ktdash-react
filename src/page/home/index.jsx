'use client'
import { Title, Text, Container, Card, Stack, Image, Group, SimpleGrid, Anchor, Accordion, AccordionItem, AccordionControl, AccordionPanel, Paper } from "@mantine/core";
import classes from './home.module.css';
import { API_PATH, request } from "../../hooks/use-api";
import { IconEye, IconFileImport, IconStar, IconStarFilled } from "@tabler/icons-react";
import useAuth from "../../hooks/use-auth";
import MainLogo from '../../assets/icon-96x96.png';
import Link from "next/link";
import NextImage from 'next/image';
import { useRouter } from "next/navigation";
import useSWR from "swr";

function News() {
    const { data: news } = useSWR('/news.php?max=10', request);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const items = news.map((item) => (
        <AccordionItem key={item.newsid} value={item.newsid.toString()}>
            <AccordionControl><Title order={4}>{new Date(item.date).toLocaleDateString("en-US", options)}</Title></AccordionControl>
            <AccordionPanel><span dangerouslySetInnerHTML={{ __html: `${item.content}` }} /></AccordionPanel>
        </AccordionItem>
    ));
    return (
        <Accordion defaultValue={news[0]?.newsid?.toString()}>
            {items}
        </Accordion>
    )
}

export default function Home() {
    const { data: spotlight } = useSWR('/roster.php?randomspotlight=1', request, {
        revalidateOnFocus: false,
        revalidateOnMount: false,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0
    });
    const { user } = useAuth();
    const router = useRouter();
    return (
        <Container my="md" fluid>
            <Stack>
                <Paper shadow="md" className={classes.wrapper}>
                    <div className={classes.inner}>
                        <Group gap={0} justify="center">
                            <Image alt="App Logo" h={80}
                                component={NextImage}
                                w="auto"
                                fit="contain" src={MainLogo} />
                            <Title mb="md" className={classes.title}>
                                KTDASH
                            </Title>
                        </Group>
                        <Container className={classes.description} size={640}>
                            <Text>KTDash is a web-based application for running your KillTeam games.</Text>
                            <ul>
                                <li>Browse the <Link href="/allfactions">Factions</Link></li>
                                <li>{user?.username ? <Link href={`/u/${user?.username}`}>Build a roster</Link> : <>Build a roster</>} or <Link href="/u/KTDash">import a pre-built roster</Link></li>
                                <li><Link href="/name">Generate names</Link> for your operatives</li>
                                <li>Use the Dashboard view to play your games and track operative wounds, TacOps, Ploys, operative orders and activation, TP/CP/VP, and more</li>
                            </ul>
                        </Container>
                    </div>
                </Paper>
                <Stack>
                    <Card key={spotlight.factionid} radius="sm" style={{ cursor: 'pointer' }} onClick={() => router.push(`/r/${spotlight.rosterid}`)} className={classes.card}>
                        <Stack>
                            <Title>Roster Spotlight</Title>
                            <SimpleGrid cols={{ base: 1, md: 2 }}>
                                <Image alt="Roster portrait" h="100%" radius="sm" src={`${API_PATH}/rosterportrait.php?rid=${spotlight.rosterid}`} />
                                <SimpleGrid visibleFrom="md" cols={{ base: 2, md: 2, lg: 3, xl: 4 }}>
                                    {spotlight.operatives.map((op, index) => (
                                        <Image key={index} alt={op.rosteropid} h="100%" radius="sm" src={`${API_PATH}/operativeportrait.php?roid=${op.rosteropid}`} />
                                    ))}
                                </SimpleGrid>
                            </SimpleGrid>
                            <Title order={2} mt={5}>{spotlight.rostername}</Title>
                            {!!spotlight?.notes && <Text>
                                {spotlight.notes}
                            </Text>}
                            <Group justify="space-between" gap={5}>
                                <Group>
                                    {!!spotlight.spotlight ? <IconStarFilled /> : <IconStar />}
                                    <Group gap={5}><IconEye />{spotlight.viewcount.toString()}</Group>
                                    <Group gap={5}><IconFileImport />{spotlight.importcount.toString()}</Group>
                                </Group>
                                <Group>
                                    <Text><Anchor onClick={(e) => e.stopPropagation()} component={Link} href={`/fa/${spotlight.factionid}/kt/${spotlight.killteamid}`}>{spotlight.killteamname} <sup>{spotlight.edition}</sup></Anchor> by <Anchor component={Link} onClick={(e) => e.stopPropagation()} href={`/u/${spotlight.username}`}>{spotlight.username}</Anchor></Text>
                                </Group>
                            </Group>
                        </Stack>
                    </Card>
                    <Card p="0">
                        <Title p="md">App News</Title>
                        <News />
                    </Card>
                </Stack>
            </Stack>
        </Container>
    );
}
