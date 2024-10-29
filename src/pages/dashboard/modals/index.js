import { Stack, Button, Group, Checkbox, Title, Text, Image, SimpleGrid, Paper, Tabs, Box } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import React from 'react';
import { DEFAULT_SETTINGS } from '../../settings';
import { API_PATH } from '../../../hooks/use-api';
import { IconCrosshair, IconSwords } from '@tabler/icons-react';

function MiniOperativeCard(props) {
    const { operative, onChange = () => { } } = props;
    const [settings] = useLocalStorage({ key: 'settings', defaultValue: DEFAULT_SETTINGS });
    return (
        <Paper withBorder p="sm" style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => onChange(operative, !!operative.hidden)}>
            <Stack gap={5}>
                <Group>
                    <Checkbox.Indicator checked={!operative.hidden} />
                    <Title textWrap="pretty" order={4}>{settings.opnamefirst === "y" ? operative.opname : operative.optype || operative.opname}</Title>
                </Group>
                <SimpleGrid cols={{ base: 2 }} spacing="xs">
                    {settings.display === "card" && <Image
                        h="100%"
                        fit="cover"
                        style={{ objectPosition: "top" }}
                        radius="md"
                        src={operative.rosteropid ? `${API_PATH}/operativeportrait.php?roid=${operative.rosteropid}` : `https://ktdash.app/img/portraits/${operative.factionid}/${operative.killteamid}/${operative.fireteamid}/${operative.opid}.jpg`}
                    />}
                    <Stack gap={5}>
                        <Text>{(settings.opnamefirst === "y" || !operative.optype) ? operative.optype : operative.opname}</Text>
                        {operative.weapons.map((weapon) => (
                            <span>
                                {weapon.weptype === "M" ?
                                    <IconSwords size={20} /> : <IconCrosshair size={20} />}
                                <span style={{ marginLeft: '5px' }}>{weapon.wepname}</span>
                            </span>
                        ))}
                    </Stack>
                </SimpleGrid>
            </Stack>
        </Paper>
    );
}

export function SelectOperativesModal(props) {
    const { onClose = () => { }, roster } = props;

    const [operatives, setOperatives] = React.useState(roster.operatives || []);

    const handleUpdateRoster = () => {
        onClose(operatives);
        modals.close("select-operatives");
    };

    const handleUpdateOperative = (operative, checked) => {
        setOperatives(operatives?.map((op) => op.rosteropid === operative.rosteropid ? { ...op, hidden: checked ? 0 : 1 } : op))
    }

    return (
        <>
            <Tabs defaultValue="operatives">
                <Tabs.List grow>
                    <Tabs.Tab value="operatives">
                        Operatives
                    </Tabs.Tab>
                    <Tabs.Tab value="composition">
                        Team Composition
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="operatives">
                    <Stack pt="md">
                        <SimpleGrid cols={{ base: 1, sm: 2 }}>
                            {operatives.map((operative) => (
                                <MiniOperativeCard operative={operative} onChange={handleUpdateOperative} />

                            ))}
                        </SimpleGrid>
                        <Group justify="flex-end">
                            <Button variant="default" onClick={() => modals.close("select-operatives")}>Cancel</Button>
                            <Button type="submit" onClick={() => handleUpdateRoster()}>Save</Button>
                        </Group>
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="composition">
                    <Box pt="md">
                        <div dangerouslySetInnerHTML={{ __html: `${roster?.killteam?.killteamcomp}` }} />
                    </Box>
                </Tabs.Panel>
            </Tabs>
        </>
    );
}
