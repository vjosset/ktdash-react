import { ActionIcon, Card, Collapse, Group, Image, Menu, SimpleGrid, Stack, Table, Text, Title, UnstyledButton } from "@mantine/core";
import { convertShapes } from "../../utils/shapes";
import { IconArrowForward, IconCamera, IconChevronDown, IconChevronUp, IconCrosshair, IconDice, IconDotsVertical, IconDroplet, IconEdit, IconShield, IconSwords, IconTrash, IconTriangleInverted, IconUser } from "@tabler/icons-react";
import { API_PATH } from "../../hooks/use-api";
import { modals } from "@mantine/modals";
import parseWeaponRules from "./parser";
import React from "react";
import { DEFAULT_SETTINGS } from "../../pages/settings";
import { useLocalStorage } from "@mantine/hooks";
import { UpdateOperativePotraitModal, UpdateWoundsModal } from "./modals";

export default function OperativeCard(props) {
    const { operative, collapsible, editable, onDelete = () => { }, woundTracker, onUpdateWounds = () => { }, onEdit = () => { } } = props;
    const [opened, setOpened] = React.useState(true);
    const [settings] = useLocalStorage({ key: 'settings', defaultValue: DEFAULT_SETTINGS });
    const [imageExpire, setImageExpire] = React.useState(true);
    const operativeStatGrid = operative?.edition === "kt21" ? (settings.display === "list" ? 6 : 3) : (settings.display === "list" ? 4 : 2);
    if (!operative) {
        return <></>;
    }
    const handleShowUpdateOperativePortrait = () => {
        modals.open({
            modalId: "update-operative-portrait",
            size: "xl",
            title: <Title order={2}>{operative.opname}</Title>,
            children: <UpdateOperativePotraitModal operative={operative} onClose={(expire) => setImageExpire(expire)} />
        });
    }
    const showUpdateWounds = () => modals.open({
        size: "auto",
        withCloseButton: false,
        centered: true,
        modalId: 'update-wounds',
        title: <Title px="md" order={3}>Update Wounds</Title>,
        children: (
            <UpdateWoundsModal operative={operative} onClose={(wounds) => onUpdateWounds(wounds)} />
        ),
    });
    const showSpecialRules = (weaponName, weapon, profile) => modals.open({
        size: "lg",
        title: <Title order={3}>{weaponName}</Title>,
        children: (
            <Stack>{parseWeaponRules(operative.edition, weapon, profile).map((rule) => (
                <Stack gap="sm">
                    <Title order={4}><span dangerouslySetInnerHTML={{ __html: convertShapes(rule.rulename) }} /></Title>
                    <Text><span dangerouslySetInnerHTML={{ __html: convertShapes(rule.ruletext) }} /></Text>
                </Stack>
            ))}</Stack>
        ),
    });
    const renderWeapon = (weapon) => {
        if (weapon?.profiles?.length > 1) {
            return (
                <>
                    {weapon.profiles.length > 1 && <Table.Tr key={weapon.wepid}>
                        <Table.Td>
                            <span>
                                {weapon.weptype === "M" ?
                                    <IconSwords size={20} /> : <IconCrosshair size={20} />}
                                <span style={{ marginLeft: '5px' }}>{weapon.wepname}</span>
                            </span>
                        </Table.Td>
                    </Table.Tr>}
                    {weapon.profiles.map((profile) => (
                        <Table.Tr key={profile.profileid}>
                            <Table.Td>- {profile.name} <span role="button" onClick={() => showSpecialRules(`${weapon.wepname} - ${profile.name}`, weapon, profile)} style={{ textDecoration: 'underline', cursor: 'pointer', userSelect: 'none' }}>
                                {profile.SR ? <span dangerouslySetInnerHTML={{ __html: `(${convertShapes(profile.SR)})` }} /> : ''}
                            </span>
                            </Table.Td>
                            <Table.Td style={{ textAlign: 'center' }}>{profile.A}</Table.Td>
                            <Table.Td style={{ textAlign: 'center' }}>{profile.BS}</Table.Td>
                            <Table.Td style={{ textAlign: 'center' }}>{profile.D}</Table.Td>
                        </Table.Tr>
                    ))}
                </>
            )
        }
        return (
            <>
                <Table.Tr key={weapon.wepid}>
                    <Table.Td>
                        <span>
                            {weapon.weptype === "M" ?
                                <IconSwords size={20} /> : <IconCrosshair size={20} />}
                            <span style={{ marginLeft: '5px' }}>
                                {weapon.wepname} <span role="button" onClick={() => showSpecialRules(weapon.wepname, weapon, weapon.profiles[0])} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                    {weapon.profiles[0].SR ? <span dangerouslySetInnerHTML={{ __html: `(${convertShapes(weapon.profiles[0].SR)})` }} /> : ''}
                                </span>
                            </span>
                        </span>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>{weapon.profiles[0].A}</Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>{weapon.profiles[0].BS}</Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>{weapon.profiles[0].D}</Table.Td>
                </Table.Tr>
            </>
        )
    }
    return (
        <Card>
            <Stack>
                <Stack style={{ cursor: collapsible ? 'pointer' : 'inherit' }} withBorder={opened} inheritPadding onClick={() => collapsible ? setOpened(!opened) : null}>
                    <Group justify="space-between" wrap="nowrap">
                        <Stack gap={5}>
                            <Title textWrap="pretty" order={3}>{settings.opnamefirst === "y" ? operative.opname : operative.optype || operative.opname}</Title>
                            <Text size="sm">{(settings.opnamefirst === "y" || !operative.optype) ? operative.optype : operative.opname}</Text>
                        </Stack>
                        {!!collapsible && <>{opened ? <IconChevronDown /> : <IconChevronUp />}</>}
                        {!!editable && <Menu withinPortal position="bottom-end" shadow="sm">
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray" onClick={(event) => event.preventDefault()}>
                                    <IconDotsVertical />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                {!!editable && <>
                                    <Menu.Item
                                        onClick={() => onEdit(operative)}
                                        leftSection={<IconEdit />}
                                    >
                                        Edit
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => handleShowUpdateOperativePortrait()}
                                        leftSection={<IconCamera />}
                                    >
                                        Edit Portrait
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => onDelete(operative)}
                                        leftSection={<IconTrash />}
                                        color="red"
                                    >
                                        Delete
                                    </Menu.Item>
                                </>}
                            </Menu.Dropdown>
                        </Menu>}
                    </Group>
                </Stack>
                <Collapse in={opened}>
                    <Stack>
                        <Stack>
                            <SimpleGrid cols={{ base: settings.display === "card" ? 2 : 1 }} spacing="xs">
                                {settings.display === "card" && <Image
                                    fit="cover"
                                    style={{ objectPosition: "top" }}
                                    h={140} radius="md"
                                    src={operative.rosteropid ? `${API_PATH}/operativeportrait.php?roid=${operative.rosteropid}&expire=${imageExpire}` : `https://ktdash.app/img/portraits/${operative.factionid}/${operative.killteamid}/${operative.fireteamid}/${operative.opid}.jpg`}
                                />}
                                <SimpleGrid cols={{ base: operativeStatGrid }} spacing="sm">
                                    <Stack justify="center" align="center" gap="xs"><Text fw={700}>APL</Text><Group gap={2}><IconTriangleInverted size={20} />{operative.APL}</Group></Stack>
                                    <Stack justify="center" align="center" gap="xs"><Text fw={700}>MOVE</Text> <Group gap={0}>{operative?.edition !== "kt21" && <IconArrowForward size={20} />}<span dangerouslySetInnerHTML={{ __html: `${convertShapes(operative.M)}` }} /></Group></Stack>
                                    {operative?.edition === "kt21" && <Stack justify="center" align="center" gap="xs"><Text fw={700}>GA</Text> <Group gap={2}><IconUser size={20} />{operative.GA}</Group></Stack>}
                                    {operative?.edition === "kt21" && <Stack justify="center" align="center" gap="xs"><Text fw={700}>DF</Text> <Group gap={2}><IconDice size={20} />{operative.DF}</Group></Stack>}
                                    <Stack justify="center" align="center" gap="xs"><Text fw={700}>SAVE</Text> <Group gap={2}><IconShield size={20} />{operative.SV}</Group></Stack>
                                    {woundTracker ? (<UnstyledButton color="white" variant="subtle" style={{ padding: 0 }} onClick={showUpdateWounds}><Stack justify="center" align="center" gap="xs">
                                        <Text fw={700}>WOUND</Text>
                                        <Group gap={2}>{operative?.edition !== "kt21" && <IconDroplet size={20} />}{`${operative.curW}/${operative.W}`}</Group>
                                    </Stack></UnstyledButton>) : (<Stack justify="center" align="center" gap="xs">
                                        <Text fw={700}>WOUND</Text>
                                        <Group gap={2}>{operative?.edition !== "kt21" && <IconDroplet size={20} />}{operative.W}</Group>
                                    </Stack>)}
                                </SimpleGrid>
                            </SimpleGrid>
                        </Stack>
                        <Stack>
                            <Table horizontalSpacing={2} style={{ fontSize: '14px', marginLeft: '-2px' }}>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>NAME</Table.Th>
                                        <Table.Th style={{ textAlign: 'center' }}>ATK</Table.Th>
                                        <Table.Th style={{ textAlign: 'center' }}>HIT</Table.Th>
                                        <Table.Th style={{ textAlign: 'center' }}>DMG</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {operative.weapons.map((weapon) => (
                                        <>{renderWeapon(weapon)}</>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Stack>
                        <SimpleGrid cols={{ base: (operative?.uniqueactions?.length && operative?.abilities?.length) ? 2 : 1 }}>
                            {!!operative?.uniqueactions?.length && <Stack gap="xs">
                                <Text fw={700}>Unique Actions</Text>
                                <Group>
                                    {operative?.uniqueactions?.map((ability) => (
                                        <Text
                                            style={{ textDecoration: 'underline', cursor: 'pointer', userSelect: 'none' }}
                                            onClick={() => {
                                                modals.open({
                                                    size: "lg",
                                                    title: <Title order={2}>{ability.title} {ability.AP ? `(${ability.AP} AP)` : ''}</Title>,
                                                    children: (
                                                        <div dangerouslySetInnerHTML={{ __html: `${convertShapes(ability.description)}` }} />
                                                    ),
                                                });
                                            }}
                                        >
                                            {ability.title} {ability.AP ? `(${ability.AP} AP)` : ''}
                                        </Text>
                                    ))}
                                </Group>
                            </Stack>}
                            {!!operative?.abilities?.length && <Stack gap="xs">
                                <Text fw={700}>Abilities</Text>
                                <Group>
                                    {operative?.abilities?.map((ability) => (
                                        <Text
                                            role="button"
                                            style={{ textDecoration: 'underline', cursor: 'pointer', userSelect: 'none' }}
                                            onClick={() => {
                                                modals.open({
                                                    size: "lg",
                                                    title: <Title order={2}>{ability.title}</Title>,
                                                    children: (
                                                        <div dangerouslySetInnerHTML={{ __html: `${convertShapes(ability.description)}` }} />
                                                    ),
                                                });
                                            }}
                                        >
                                            {ability.title}
                                        </Text>
                                    ))}
                                </Group>
                            </Stack>}
                        </SimpleGrid>
                        {!!operative?.equipments?.length && <Stack gap="xs">
                            <Text fw={700}>Equipment</Text>
                            <Group>
                                {operative?.equipments?.map((equip) => (
                                    <Text
                                        role="button"
                                        style={{ textDecoration: 'underline', cursor: 'pointer', userSelect: 'none' }}
                                        onClick={() => {
                                            modals.open({
                                                size: "lg",
                                                title: <Title order={2}>{equip.eqname}</Title>,
                                                children: (
                                                    <div dangerouslySetInnerHTML={{ __html: `${convertShapes(equip.eqdescription)}` }} />
                                                ),
                                            });
                                        }}
                                    >
                                        {equip.eqname}
                                    </Text>
                                ))}
                            </Group>
                        </Stack>}
                        <Stack>
                            <Text size="xs">{operative.keywords}</Text>
                        </Stack>
                    </Stack>
                </Collapse>
            </Stack>
        </Card>
    );
}