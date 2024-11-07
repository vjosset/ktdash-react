import { Stack, Button, Group, Checkbox, Title, Text, Image, SimpleGrid, Paper, Tabs, Box } from '@mantine/core';
import { modals } from '@mantine/modals';
import React from 'react';
import { API_PATH } from '../../../hooks/use-api';
import { IconCrosshair, IconSwords } from '@tabler/icons-react';
import { useSettings } from '../../../hooks/use-settings';
import classes from './check-card.module.css';

function MiniOperativeCard(props) {
    const { operative, onChange = () => { } } = props;
    const [settings] = useSettings();
    return (
        <Paper className={classes.root} data-checked={!operative.hidden || undefined} withBorder p="sm" style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => onChange(operative, !!operative.hidden)}>
            <Stack gap={5}>
                <SimpleGrid cols={{ base: 2 }} spacing="xs">
                    {settings.display === "card" && <Image
                        alt="Operative Portrait"
                        fit="cover"
                        style={{ objectPosition: "top", height: '100%' }}
                        radius="sm"
                        src={operative.rosteropid ? `${API_PATH}/operativeportrait.php?roid=${operative.rosteropid}` : `https://ktdash.app/img/portraits/${operative.factionid}/${operative.killteamid}/${operative.fireteamid}/${operative.opid}.jpg`}
                    />}
                    <Stack gap={5}>
                        <Group gap={5}>
                            <Title textWrap="pretty" order={4}>{settings.opnamefirst === "y" ? operative.opname : operative.optype || operative.opname}</Title>
                        </Group>
                        <Text>{(settings.opnamefirst === "y" || !operative.optype) ? operative.optype : operative.opname}</Text>
                        <Group gap={5}>
                            {operative.weapons.map((weapon, index) => (
                                <Text key={index} size="sm">
                                    {weapon.weptype === "M" ?
                                        <IconSwords size={15} /> : <IconCrosshair size={15} />}
                                    <span style={{ marginLeft: '5px' }}>{weapon.wepname}</span>
                                </Text>
                            ))}
                        </Group>
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
                            {operatives.map((operative, index) => (
                                <MiniOperativeCard key={index} operative={operative} onChange={handleUpdateOperative} />
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
