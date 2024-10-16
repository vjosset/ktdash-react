import React from "react";
import { Card, Container, Image, LoadingOverlay, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import classes from './factions.module.css';
import { useRequest } from "../../hooks/use-api";

export default function Factions() {
    const { data: factions, isFetching: isFetchingFactions } = useRequest("/faction.php");
    const cards = factions?.map((faction) => (
        <Card key={faction.factionid} p="md" radius="md" component="a" className={classes.card} href={`/fa/${faction.factionid}`}>
            <Stack>
                <Image radius="md" src={`/img/portraits/${faction.factionid}/${faction.factionid}.jpg`} />
                <Title className={classes.title} mt={5}>{faction.factionname}</Title>
                <Text>
                    <div dangerouslySetInnerHTML={{ __html: `${faction.description}` }} />
                </Text>
            </Stack>
        </Card>
    ));
    if (isFetchingFactions) {
        return (<LoadingOverlay visible={isFetchingFactions} />);
    }

    return (
        <Container py="md" px="md" fluid>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3, xl: 4 }}>
                {cards}
            </SimpleGrid>
        </Container>
    );
}
