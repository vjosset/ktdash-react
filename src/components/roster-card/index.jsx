'use client'
import { ActionIcon, Anchor, Card, Group, Image, Menu, Stack, Text, Title } from "@mantine/core";
import classes from './rosters.module.css';
import { API_PATH } from "../../hooks/use-api";
import { IconCards, IconCopy, IconDotsVertical, IconEye, IconFileImport, IconPhoto, IconStar, IconStarFilled, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RosterCard(props) {
    const { roster, editable, onDelete = () => { }, onDeploy = () => { }, onCopy = () => { } } = props;
    const router = useRouter();
    return (
        <Card key={roster.rosterid} p="md" radius="sm" style={{ cursor: 'pointer' }} onClick={() => router.push(`/r/${roster.rosterid}`)} className={classes.card}>
            <Group justify="space-between" wrap="nowrap">
                <Title textWrap="pretty" order={3}>{roster.rostername}</Title>
                <Menu withinPortal position="bottom-end" shadow="sm">
                    <Menu.Target>
                        <ActionIcon variant="subtle" color="gray" onClick={(event) => { event.preventDefault(); event.stopPropagation() }}>
                            <IconDotsVertical />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown onClick={(event) => { event.preventDefault(); event.stopPropagation() }}>
                        <Menu.Item leftSection={<IconEye />} onClick={() => navigate(`/r/${roster.rosterid}`)}>
                            View
                        </Menu.Item>

                        {!!editable && <Menu.Item
                            onClick={() => onDeploy(roster.rosterid)}
                            leftSection={<IconCards />}
                        >
                            Deploy
                        </Menu.Item>}
                        <Menu.Item leftSection={<IconPhoto />} onClick={() => navigate(`/r/${roster.rosterid}/g`)}>
                            Photo Gallery
                        </Menu.Item>
                        <Menu.Item leftSection={<IconCopy />} onClick={() => onCopy(roster)}>
                            Duplicate Roster
                        </Menu.Item>
                        {!!editable && <Menu.Item
                            onClick={() => onDelete(roster)}
                            leftSection={<IconTrash />}
                            color="red"
                        >
                            Delete
                        </Menu.Item>}
                    </Menu.Dropdown>
                </Menu>
            </Group>
            <Stack mt="md">
                <Image alt="Roster Portrait" radius="sm" src={`${API_PATH}/rosterportrait.php?rid=${roster.rosterid}`} />
                <Group justify="space-between" gap={5}>
                    <Group>
                        {!!roster.spotlight ? <IconStarFilled /> : <IconStar />}
                        <Group gap={5}><IconEye />{roster.viewcount.toString()}</Group>
                        <Group gap={5}><IconFileImport />{roster.importcount.toString()}</Group>
                    </Group>
                    <Group>
                        <Text>
                            <Anchor onClick={(e) => e.stopPropagation() } component={Link} href={`/fa/${roster.factionid}/kt/${roster.killteamid}`}>{roster.killteamname} <sup>{roster.edition}</sup></Anchor> by <Anchor onClick={(e) => e.stopPropagation() }  component={Link} href={`/u/${roster.username}`}>{roster.username}</Anchor>
                        </Text>
                    </Group>
                </Group>
            </Stack>
        </Card>
    );
}