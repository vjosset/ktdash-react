import React from "react";
import { Card, Container, Image, LoadingOverlay, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import classes from './factions.module.css';
import Link from "next/link";

export default function Factions(props) {
    const { factions } = props;

    const cards = factions?.map((faction) => (
        <Card key={faction.factionid} p="md" radius="sm" component={Link} className={classes.card} href={`/fa/${faction.factionid}`}>
            <Stack>
                <Title order={2} className={classes.title}>{faction.factionname}</Title>
                <Image radius="sm" src={`https://ktdash.app/img/portraits/${faction.factionid}/${faction.factionid}.jpg`} />
                <Text>
                    <span dangerouslySetInnerHTML={{ __html: `${faction.description.split('<br/>')[0]}` }} />
                </Text>
            </Stack>
        </Card>
    ));

    return (
        <Container py="md" px="md" fluid>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
                {cards}
            </SimpleGrid>
        </Container>
    );
}
