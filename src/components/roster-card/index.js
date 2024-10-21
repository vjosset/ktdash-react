import { Card, Group, Image, Stack, Text, Title } from "@mantine/core";
import { Link } from "wouter";
import classes from './rosters.module.css';
import { API_PATH } from "../../hooks/use-api";
import { IconEye, IconFileImport, IconStar, IconStarFilled } from "@tabler/icons-react";

export default function RosterCard(props) {
    const { roster } = props;
    return (
        <Card key={roster.rosterid} p="md" radius="md" component="a" className={classes.card} href={`/r/${roster.rosterid}`}>
            <Stack>
                <Image radius="md" src={`${API_PATH}/rosterportrait.php?rid=${roster.rosterid}`} />
                <Group gap="xs" align="end">
                    <Title>
                        {roster?.rostername}
                    </Title>by<Link href={`/u/${roster.username}`}>{roster.username}</Link>
                </Group>
                <Group>
                    {!!roster.spotlight ? <IconStarFilled stroke={1.5} /> : <IconStar stroke={1.5} />}
                    <Group gap={5}><IconEye stroke={1.5} />{roster.viewcount.toString()}</Group>
                    <Group gap={5}><IconFileImport stroke={1.5} />{roster.importcount.toString()}</Group>
                </Group>
                <Text>
                    {roster.notes}
                </Text>
            </Stack>
        </Card>
    );
}