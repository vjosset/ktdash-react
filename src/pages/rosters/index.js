import React from "react";
import { Card, Container, Group, Image, LoadingOverlay, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import classes from './rosters.module.css';
import { API_PATH, useRequest } from "../../hooks/use-api";
import { Link, useRoute } from "wouter";
import { IconEye, IconFileImport, IconStar, IconStarFilled } from "@tabler/icons-react";

export default function Rosters() {
    const [, params] = useRoute("/u/:username");
    const { data: user, isFetching: isFetchingRosters } = useRequest(`/user.php?username=${params?.username}`);
    const rosters = user?.rosters ?? [];

    const cards = rosters?.map((roster) => (
        <Card key={roster.rosterid} p="md" radius="md" component="a" className={classes.card} href={`/r/${roster.rosterid}`}>
            <Stack>
                <Image radius="md" src={`${API_PATH}/rosterportrait.php?rid=${roster.rosterid}`} />
                <Group gap="xs" align="end">
                    <Title>
                        {roster?.rostername}
                    </Title>by<Link href={`/u/${roster.username}`}>{roster.username}</Link>
                </Group>
                <Group>{!!roster.spotlight ? <IconStarFilled stroke={1.5} /> : <IconStar stroke={1.5} />}<Group gap={5}><IconEye stroke={1.5} />{roster.viewcount.toString()}</Group><Group gap={5}><IconFileImport stroke={1.5} />{roster.importcount.toString()}</Group></Group>
                <Text>
                    {roster.notes}
                </Text>
            </Stack>
        </Card>
    ));
    if (isFetchingRosters) {
        return (<LoadingOverlay visible={isFetchingRosters} />);
    }

    return (
        <Container py="md" px="md" fluid>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3, xl: 4 }}>
                {cards}
            </SimpleGrid>
        </Container>
    );
}
