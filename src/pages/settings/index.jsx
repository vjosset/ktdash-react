import { Center, Container, rem, SegmentedControl, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconIdBadge, IconList } from '@tabler/icons-react';
import { useSettings } from '../../hooks/use-settings';

export default function Settings() {
    const [settings, setSettings] = useSettings();

    const updateSettings = (key, value) => {
        setSettings({
            ...settings,
            [key]: value
        });
    }

    return (
        <Container py="md" fluid>
            <Stack>
                <Stack>
                    <Title>Display</Title>
                    <SimpleGrid spacing="md" cols={{ base: 1, md: 2 }}>
                        <Stack>
                            <Title order={3}>Editions</Title>
                            <Text>Select which editions to show.</Text>
                            <SegmentedControl
                                value={settings?.edition}
                                onChange={(value) => updateSettings('edition', value)}
                                color="orange"
                                data={[{
                                    value: '',
                                    label: 'Both'
                                },
                                {
                                    value: 'kt21',
                                    label: 'KT21'
                                },
                                {
                                    value: 'kt24',
                                    label: 'KT24'
                                }]}
                            />
                        </Stack>
                        <Stack>
                            <Title order={3}>Portraits</Title>
                            <Text>Displays the portraits for operatives and rosters if enabled.</Text>
                            <SegmentedControl
                                value={settings?.display}
                                onChange={(value) => updateSettings('display', value)}
                                color="orange"
                                data={[{
                                    value: 'card',
                                    label: (
                                        <Center style={{ gap: 10 }}>
                                            <IconIdBadge style={{ width: rem(16), height: rem(16) }} />
                                            <span>Show</span>
                                        </Center>
                                    ),
                                },
                                {
                                    value: 'list',
                                    label: (
                                        <Center style={{ gap: 10 }}>
                                            <IconList style={{ width: rem(16), height: rem(16) }} />
                                            <span>Hide</span>
                                        </Center>
                                    ),
                                }]}
                            />
                        </Stack>
                        <Stack>
                            <Title order={3}>Operative Name/Type</Title>
                            <Text>Show Operative Name or Type first on cards.</Text>
                            <SegmentedControl
                                value={settings?.opnamefirst}
                                onChange={(value) => updateSettings('opnamefirst', value)}
                                color="orange"
                                data={[{
                                    value: 'y',
                                    label: 'Name First'
                                },
                                {
                                    value: 'n',
                                    label: 'Type First'
                                }]}
                            />
                        </Stack>
                        <Stack>
                            <Title order={3}>Auto-Generate Operative Names</Title>
                            <Text>Auto-generates operative names if enabled. If disabled, uses the operative type as its name.</Text>
                            <SegmentedControl
                                value={settings?.useoptypeasname}
                                onChange={(value) => updateSettings('useoptypeasname', value)}
                                color="orange"
                                data={[{
                                    value: 'n',
                                    label: 'Auto-Generate'
                                },
                                {
                                    value: 'y',
                                    label: 'Use Optype'
                                }]}
                            />
                        </Stack>
                    </SimpleGrid>
                </Stack>
                <Stack>
                    <Title>Game Options</Title>
                    <SimpleGrid spacing="md" cols={{ base: 1, md: 2 }}>
                        <Stack>
                            <Title order={3}>Narrative Info</Title>
                            <Text>Shows or hides narrative play information (Battle Honours, Rare Equipment, XP) - KT21 Only</Text>
                            <SegmentedControl
                                value={settings?.shownarrative}
                                onChange={(value) => updateSettings('shownarrative', value)}
                                color="orange"
                                data={[{
                                    value: 'y',
                                    label: 'Show'
                                },
                                {
                                    value: 'n',
                                    label: 'Hide'
                                }]}
                            />
                        </Stack>
                    </SimpleGrid>
                </Stack>
            </Stack>
        </Container>
    );
}