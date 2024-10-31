import { TextInput, Stack, Button, Group, Select, Table, SimpleGrid, Text, Checkbox, Textarea, LoadingOverlay, Box, ActionIcon, FileInput, Image } from '@mantine/core';
import { API_PATH, request, requestText, useRequest } from '../../../hooks/use-api';
import { modals } from '@mantine/modals';
import React from 'react';
import { flatten, groupBy, keyBy } from 'lodash';
import { convertShapes } from '../../../utils/shapes';
import { IconArrowForward, IconCrosshair, IconDice, IconDroplet, IconPhoto, IconRefresh, IconShield, IconSwords, IconTriangleInverted, IconUser } from '@tabler/icons-react';
import useAuth from '../../../hooks/use-auth';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useSettings } from '../../../hooks/use-settings';

export function UpdateRosterPotraitModal(props) {
    const { onClose, roster } = props;

    const [portrait, setPortrait] = React.useState();

    const setFileUpload = (file) => {
        setPortrait({
            picturePreview: URL.createObjectURL(file),
            pictureAsFile: file
        })
    }

    const handleUploadRosterPortrait = () => {
        const formData = new FormData();
        formData.append(
            "file",
            portrait.pictureAsFile
        );
        request(`/rosterportrait.php?rid=${roster.rosterid}`, {
            method: "POST",
            body: formData
        }).then((data) => {
            if (data?.success) {
                notifications.show({
                    title: 'Upload Succeeded',
                    message: `Successfully uploaded roster portrait.`,
                })
                modals.close("update-portrait");
                onClose(Date.now())
            } else {
                notifications.show({
                    title: 'Upload Failed',
                    message: `${data}`,
                })
            }
        })
    };

    const handleDeleteRosterPortrait = () => {
        request(`/rosterportrait.php?rid=${roster.rosterid}`, {
            method: "DELETE"
        }).then((data) => {
            if (data?.success) {
                notifications.show({
                    title: 'Delete Succeeded',
                    message: `Successfully deleted roster portrait.`,
                })
                modals.close("update-portrait");
                onClose(Date.now())
            } else {
                notifications.show({
                    title: 'Delete Failed',
                    message: `${data}`,
                })
            }
        })
    };

    return (
        <>
            <Stack>
                <Image fit="cover" style={{ objectPosition: "top" }} h={300} radius="md" src={portrait?.picturePreview || `${API_PATH}/rosterportrait.php?rid=${roster.rosterid}`} />
                <FileInput
                    leftSection={<IconPhoto />}
                    label="Roster Portrait"
                    placeholder="Upload Image"
                    value={portrait?.pictureAsFile}
                    onChange={setFileUpload}
                />
                <Group justify="flex-end">
                    <Button variant="default" onClick={() => modals.close("update-portrait")}>Cancel</Button>
                    <Button color="red" onClick={handleDeleteRosterPortrait}>Delete Portrait</Button>
                    <Button type="submit" onClick={handleUploadRosterPortrait}>Save</Button>
                </Group>
            </Stack>
        </>
    );
}

export function UpdateRosterModal(props) {
    const { onClose, roster } = props;
    const { user } = useAuth();
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            rostername: roster.rostername,
            notes: roster.notes,
            portraitcopyok: roster.portraitcopyok ? true : false,
        },
        validate: {
            rostername: (value) => (!value ? 'Roster must have a name' : null)
        },
    });

    const handleUpdateRoster = form.onSubmit((values) => {
        const newRoster = {
            "userid": user.userid,
            "rosterid": roster.rosterid,
            "rostername": values.rostername,
            "factionid": roster.factionid,
            "killteamid": roster.killteamid,
            "seq": 1,
            "notes": values.notes,
            "CP": roster.CP,
            "TP": roster.TP,
            "VP": roster.VP,
            "RP": roster.RP,
            "ployids": roster.ployids,
            "portraitcopyok": values.portraitcopyok ? 1 : 0,
            "keyword": roster.keyword
        };
        onClose(newRoster);
        modals.close("update-details");
    });

    return (
        <>
            <form
                onSubmit={handleUpdateRoster}
            >
                <Stack>
                    <TextInput
                        label="Roster Name"
                        placeholder="Roster Name"
                        key={form.key('rostername')}
                        {...form.getInputProps('rostername')}
                    />
                    <Textarea
                        rows={8}
                        label="Notes"
                        placeholder="Notes"
                        key={form.key('notes')}
                        {...form.getInputProps('notes')}
                    />
                    <Checkbox
                        clearable
                        label="Copy portraits when imported by other users"
                        key={form.key('portraitcopyok')}
                        {...form.getInputProps('portraitcopyok', { type: 'checkbox' })}
                    />
                    <Group justify="flex-end">
                        <Button variant="default" onClick={() => modals.close("update-details")}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </Group>
                </Stack>
            </form>
        </>
    );
}

const Weapon = (props) => {
    const { weapon, checked, onCheck = () => { } } = props;
    if (weapon?.profiles?.length > 1) {
        return (
            <>
                {weapon.profiles.length > 1 && <Table.Tr key={weapon.wepid}>
                    <Table.Td style={{ width: '30px' }}>
                        <Checkbox
                            checked={checked}
                            onChange={(event) => onCheck(weapon.wepid, event.currentTarget.checked)}
                        />
                    </Table.Td>
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
                        <Table.Td />
                        <Table.Td>- {profile.name} <span role="button" style={{ textDecoration: 'underline', cursor: 'pointer', userSelect: 'none' }}>
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
                <Table.Td style={{ width: '30px' }}>
                    <Checkbox
                        checked={checked}
                        onChange={(event) => onCheck(weapon.wepid, event.currentTarget.checked)}
                    />
                </Table.Td>
                <Table.Td>
                    <span>
                        {weapon.weptype === "M" ?
                            <IconSwords size={20} /> : <IconCrosshair size={20} />}
                        <span style={{ marginLeft: '5px' }}>
                            {weapon.wepname} <span role="button" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
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

export function OperativeModal(props) {
    const { onClose, roster, operative: existingOperative } = props;
    const modalId = existingOperative ? 'edit-operative' : 'add-operative';
    const [ settings ] = useSettings();
    const [operativeData, setOperativeData] = React.useState(existingOperative);
    const [operativeId, setOperativeId] = React.useState(existingOperative?.opid);
    const { data: killteam, isFetching: isFetchingTeam } = useRequest(`/killteam.php?fa=${roster?.factionid}&kt=${roster?.killteamid}`);
    const operatives = keyBy(flatten(killteam?.fireteams.map((fireteam) => fireteam.operatives)), 'opid');
    const operativeOptions = Object.values(operatives || {})?.map((operative) => ({
        label: operative.opname,
        value: operative.opid
    }));
    const hiddenKT24Equipment = new Set(['Equipment', 'Universal Equipment']);

    const getRandomOperativeName = (opData) => requestText(`/name.php?factionid=${opData.factionid}&killteamid=${opData.killteamid}&fireteamid=${opData.fireteamid}&opid=${opData.opid}`);

    const setInitialOperativeData = async (opId) => {
        setOperativeId(opId);
        let newOpData = {
            ...operatives[opId],
            weapons: [...operatives[opId].weapons.filter((weapon) => !!weapon.isdefault)]
        };
        if (settings.useoptypeasname !== "y") {
            newOpData.opname = await getRandomOperativeName(newOpData);
        }
        setOperativeData(newOpData);
    }

    const randomizeOperativeName = async () => {
        if (!operativeData) {
            return;
        }

        const randomName = await getRandomOperativeName(operativeData);

        if (randomName) {
            setOperativeData({
                ...operativeData,
                opname: randomName
            })
        }
    }

    const filterEquipment = (equipCategory) => {
        if (killteam?.edition === "kt24") {
            return !hiddenKT24Equipment.has(equipCategory)
        } else {
            return true;
        }
    }

    const equipment = groupBy(roster?.killteam?.equipments, 'eqcategory');

    // Unmodified original operative data
    const operative = operatives[operativeId];

    const validateSelection = () => {
        return !!operativeData && !!operativeData?.opname;
    }

    const handleConfirmOperative = ((e) => {
        e.preventDefault();
        onClose(operativeData);
        modals.close(modalId)
    });

    if (isFetchingTeam) {
        return (<Box h={300}><LoadingOverlay zIndex={1000} visible={isFetchingTeam} /></Box>);
    }

    if (!killteam) {
        return;
    }

    return (
        <>
            <form
                onSubmit={handleConfirmOperative}
            >
                <Stack>
                    {!existingOperative && <Select
                        label="Select Operative"
                        placeholder="Select Operative"
                        data={operativeOptions}
                        value={operativeId}
                        onChange={(operativeId) => {
                            setInitialOperativeData(operativeId);
                        }}
                    />}
                    <TextInput
                        label="Operative Name"
                        placeholder="Operative Name"
                        rightSection={settings.useoptypeasname === "y" ? <></> : <ActionIcon onClick={() => randomizeOperativeName()}><IconRefresh /></ActionIcon>}
                        value={operativeData?.opname}
                        onChange={(e) => {
                            setOperativeData({
                                ...operativeData,
                                opname: e.target.value
                            })
                        }}
                    />
                    {!!operative && <SimpleGrid cols={{ base: operative?.edition === "kt21" ? 6 : 4 }} spacing={0}>
                        <Stack justify="center" align="center" gap="xs"><Text fw={700}>APL</Text><Group gap={2}><IconTriangleInverted size={20} />{operative.APL}</Group></Stack>
                        <Stack justify="center" align="center" gap="xs"><Text fw={700}>MOVE</Text> <Group gap={0}>{operative?.edition !== "kt21" && <IconArrowForward size={20} />}<span dangerouslySetInnerHTML={{ __html: `${convertShapes(operative.M)}` }} /></Group></Stack>
                        {operative?.edition === "kt21" && <Stack justify="center" align="center" gap="xs"><Text fw={700}>GA</Text> <Group gap={2}><IconUser size={20} />{operative.GA}</Group></Stack>}
                        {operative?.edition === "kt21" && <Stack justify="center" align="center" gap="xs"><Text fw={700}>DF</Text> <Group gap={2}><IconDice size={20} />{operative.DF}</Group></Stack>}
                        <Stack justify="center" align="center" gap="xs"><Text fw={700}>SAVE</Text> <Group gap={2}><IconShield size={20} />{operative.SV}</Group></Stack>
                        <Stack justify="center" align="center" gap="xs"><Text fw={700}>WOUND</Text> <Group gap={2}><IconDroplet size={20} />{operative.W}</Group></Stack>
                    </SimpleGrid>}
                    {!!operative && <Table horizontalSpacing={2} style={{ fontSize: '14px', marginLeft: '-2px' }}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th />
                                <Table.Th>NAME</Table.Th>
                                <Table.Th style={{ textAlign: 'center' }}>ATK</Table.Th>
                                <Table.Th style={{ textAlign: 'center' }}>HIT</Table.Th>
                                <Table.Th style={{ textAlign: 'center' }}>DMG</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {operative?.weapons?.map((weapon) => (
                                <Weapon
                                    weapon={weapon}
                                    checked={!!operativeData?.weapons?.filter((wep) => wep.wepid === weapon.wepid)?.length}
                                    onCheck={(weaponid, active) => {
                                        if (active) {
                                            setOperativeData({
                                                ...operativeData,
                                                weapons: [...operativeData?.weapons, ...operative?.weapons?.filter((wep) => wep.wepid === weaponid)]
                                            })
                                        } else {
                                            setOperativeData({
                                                ...operativeData,
                                                weapons: [...operativeData?.weapons?.filter((wep) => wep.wepid !== weaponid)]
                                            })
                                        }
                                    }}
                                />
                            ))}
                        </Table.Tbody>
                    </Table>}
                    {!!equipment && <>
                        {Object.keys(equipment).filter(filterEquipment).map((eqCategory) => {
                            const equips = equipment[eqCategory];
                            return (
                                <>
                                    <Text>{eqCategory}</Text>
                                    <SimpleGrid cols={{ base: 2, sm: 4 }}>
                                        {
                                            equips?.map((eq) => (
                                                <>
                                                    <Checkbox
                                                        checked={!!operativeData?.equipments?.filter((equip) => equip.eqid === eq.eqid)?.length}
                                                        onChange={(event) => {
                                                            if (event.target.checked) {
                                                                setOperativeData({
                                                                    ...operativeData,
                                                                    equipments: [...(operativeData?.equipments || []), eq]
                                                                })
                                                            } else {
                                                                setOperativeData({
                                                                    ...operativeData,
                                                                    equipments: [...operativeData?.equipments?.filter((operativeeq) => operativeeq.eqid !== eq.eqid)]
                                                                })
                                                            }
                                                        }}
                                                        label={eq.eqname}
                                                    />
                                                </>
                                            ))
                                        }
                                    </SimpleGrid>
                                </>
                            )
                        })}
                    </>}
                    <Group justify="flex-end">
                        <Button variant="default" onClick={() => modals.close(modalId)}>Cancel</Button>
                        <Button type="submit" disabled={!validateSelection()}>{existingOperative ? 'Update' : 'Add'}</Button>
                    </Group>
                </Stack>
            </form>
        </>
    );
}