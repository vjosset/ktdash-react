import { TextInput, Stack, Button, Group, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRequest } from '../../../hooks/use-api';
import { modals } from '@mantine/modals';
import React from 'react';
import useAuth from '../../../hooks/use-auth';

export function AddRosterModal(props) {
    const { onClose } = props;
    const { user } = useAuth();
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
    const { data: factions } = useRequest("/faction.php?loadkts=1");

    React.useEffect(() => {
        form.setFieldValue('team', null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form?.getValues()?.faction]);

    const factionOptions = factions?.map((faction, index) => ({
        label: faction.factionname,
        value: index.toString()
    }));

    const teamOptions = factions?.[form?.getValues()?.faction]?.killteams?.map((team, index) => ({
        label: team.killteamname,
        value: index.toString()
    }));

    const handleCreateRoster = form.onSubmit((values) => {
        form.reset();
        var roster = {
            "rosterid": null,
            "factionid": factions[values.faction].factionid,
            "killteamid": factions[values.faction].killteams[values.team].killteamid,
            "rostername": values.rostername,
            "portraitcopyok": 0,
            "keyword": "",
            "userid": user.userid,
            "CP": 0,
            "VP": 0
        };
        onClose(roster);
        modals.close("create-roster");
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