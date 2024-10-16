import { Card, Group, Image, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import { convertShapes } from "../../utils/shapes";
import { IconArrowForward, IconCrosshair, IconDroplet, IconShield, IconSwords, IconTriangleInverted } from "@tabler/icons-react";

export default function OperativeCard(props) {
    const { operative } = props;
    if (!operative) {
        return <></>;
    }
    const renderWeapon = (weapon) => {
        if (weapon?.profiles?.length > 1) {
            return (
                <>
                    {weapon.profiles.length > 1 && <Table.Tr key={weapon.wepid}>
                        <Table.Td>
                            <Group wrap="nowrap" gap="sm">
                                {weapon.weptype === "M" ?
                                    <IconSwords size={20} stroke={1.5} /> : <IconCrosshair size={20} stroke={1.5} />}
                                {weapon.wepname}
                            </Group>
                        </Table.Td>
                    </Table.Tr>}
                    {weapon.profiles.map((profile) => (
                        <Table.Tr key={profile.profileid}>
                            <Table.Td>- {profile.name}{profile.SR ? ` (${profile.SR})` : ''}</Table.Td>
                            <Table.Td>{profile.A}</Table.Td>
                            <Table.Td>{profile.BS}</Table.Td>
                            <Table.Td>{profile.D}</Table.Td>
                        </Table.Tr>
                    ))}
                </>
            )
        }
        return (
            <>
                <Table.Tr key={weapon.wepid}>
                    <Table.Td>
                        <Group wrap="nowrap" gap="sm">
                            {weapon.weptype === "M" ?
                                <IconSwords size={20} stroke={1.5} /> : <IconCrosshair size={20} stroke={1.5} />}
                            {weapon.wepname}{weapon.profiles[0].SR ? ` (${weapon.profiles[0].SR})` : ''}
                        </Group>
                    </Table.Td>
                    <Table.Td>{weapon.profiles[0].A}</Table.Td>
                    <Table.Td>{weapon.profiles[0].BS}</Table.Td>
                    <Table.Td>{weapon.profiles[0].D}</Table.Td>
                </Table.Tr>
            </>
        )
    }
    return (
        <Card>
            <Stack>
                <Card.Section withBorder inheritPadding py="xs">
                    <Title order={3}>{operative.opname}</Title>
                </Card.Section>
                <Card.Section withBorder inheritPadding pb="xs">
                    <SimpleGrid cols={{ base: 2 }}>
                        <Image fit="cover" style={{ objectPosition: "top" }} h={140} radius="md" src={`/img/portraits/${operative?.factionid}/${operative?.killteamid}/${operative?.killteamid}/${operative?.opid}.jpg`} />
                        <SimpleGrid cols={{ base: 2 }} spacing="md">
                            <Stack justify="center" align="center"><Text fw={700}>APL</Text><Group gap="xs"><IconTriangleInverted size={20} stroke={1.5} />{operative.APL}</Group></Stack>
                            <Stack justify="center" align="center"><Text fw={700}>MOVE</Text> <Group gap="xs"><IconArrowForward size={20} stroke={1.5} /><span dangerouslySetInnerHTML={{ __html: `${convertShapes(operative.M)}` }} /></Group></Stack>
                            <Stack justify="center" align="center"><Text fw={700}>SAVE</Text> <Group gap="xs"><IconShield size={20} stroke={1.5} />{operative.SV}</Group></Stack>
                            <Stack justify="center" align="center"><Text fw={700}>WOUNDS</Text> <Group gap="xs"><IconDroplet size={20} stroke={1.5} />{operative.W}</Group></Stack>
                        </SimpleGrid>
                    </SimpleGrid>
                </Card.Section>
                <Card.Section withBorder inheritPadding pb="xs">
                    <Table horizontalSpacing="xs">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>NAME</Table.Th>
                                <Table.Th>ATK</Table.Th>
                                <Table.Th>HIT</Table.Th>
                                <Table.Th>DMG</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {operative.weapons.map((weapon) => (
                                <>{renderWeapon(weapon)}</>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Card.Section>
                {!!operative?.uniqueactions?.length && <Card.Section withBorder inheritPadding pb="xs">
                    <Text fw={700}>Unique Actions</Text>
                    <Group>
                        {operative?.uniqueactions?.map((ability) => (
                            <Text td="underline">{ability.title} {ability.AP ? `(${ability.AP} AP)` : ''}</Text>
                        ))}
                    </Group>
                </Card.Section>}
                {!!operative?.abilities?.length && <Card.Section withBorder inheritPadding pb="xs">
                    <Text fw={700}>Abilities</Text>
                    <Group>
                        {operative?.abilities?.map((ability) => (
                            <Text td="underline">{ability.title}</Text>
                        ))}
                    </Group>
                </Card.Section>}
            </Stack>
        </Card>
    );
}