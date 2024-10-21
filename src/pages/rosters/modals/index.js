import { TextInput, Stack, Button, Group, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRequest } from '../../../hooks/use-api';
import { modals } from '@mantine/modals';
import React from 'react';

export function AddRosterModal() {
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            rostername: '',
            faction: null,
            team: null,
        },
        validate: {
            rostername: (value) => (!value ? 'Roster must have a name' : null),
            faction: (value) => (!value ? 'Must select a faction' : null),
            team: (value) => (!value ? 'Must select a team' : null),
        },
    });
    const { data: factions } = useRequest("/faction.php");
    const { data: faction } = useRequest(`/faction.php?fa=${form?.getValues()?.faction}`, {}, !!form?.getValues()?.faction);

    React.useEffect(() => {
        form.setFieldValue('team', null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form?.getValues()?.faction]);

    const factionOptions = factions?.map((faction) => ({
        label: faction.factionname,
        value: faction.factionid
    }));

    const teamOptions = faction?.killteams?.map((team) => ({
        label: team.killteamname,
        value: team.killteamid
    }));

    const handleCreateRoster = form.onSubmit((values) => {
        console.log(values);
        form.reset();
    });

    return (
        <>
            <form
                onSubmit={handleCreateRoster}
            >
                <Stack>
                    <TextInput
                        label="Roster Name"
                        placeholder="Roster Name"
                        key={form.key('rostername')}
                        {...form.getInputProps('rostername')}
                    />
                    <Select
                        label="Select Faction"
                        placeholder="Select Faction"
                        data={factionOptions}
                        key={form.key('faction')}
                        {...form.getInputProps('faction')}
                    />
                    <Select
                        clearable
                        label="Select Team"
                        placeholder="Select Faction"
                        data={teamOptions}
                        key={form.key('team')}
                        {...form.getInputProps('team')}
                    />
                    <Group justify="flex-end">
                        <Button variant="default" onClick={() => modals.closeAll()}>Cancel</Button>
                        <Button type="submit">Create</Button>
                    </Group>
                </Stack>
            </form>
        </>
    );
}