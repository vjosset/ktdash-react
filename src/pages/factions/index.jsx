import React from "react";
import { Card, Container, Image, LoadingOverlay, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import classes from './factions.module.css';
import { useRequest } from "../../hooks/use-api";
import { Link } from "wouter";

export default function Factions() {
    const { data: factions, isFetching: isFetchingFactions } = useRequest("/faction.php");
    const cards = factions?.map((faction) => (
        <Card key={faction.factionid} p="md" radius="sm" component={Link} className={classes.card} href={`/fa/${faction.factionid}`}>
            <Stack>
                <Title order={2} className={classes.title}>{faction.factionname}</Title>
                <Image radius="sm" src={`https://ktdash.app/img/portraits/${faction.factionid}/${faction.factionid}.jpg`} />
                <Text>
                    <div dangerouslySetInnerHTML={{ __html: `${faction.description.split('<br/>')[0]}` }} />
                </Text>
            </Stack>
        </Card>
    ));
    if (isFetchingFactions) {
        return (<LoadingOverlay visible={isFetchingFactions} />);
    }

    return (
        <Container py="md" px="md" fluid>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
                {cards}
            </SimpleGrid>
        </Container>
    );
}
