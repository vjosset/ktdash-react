import { TextInput, Stack, Button, Group, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRequest } from '../../../hooks/use-api';
import { modals } from '@mantine/modals';
import React from 'react';
import { flatten } from 'lodash';

export function AddOperativeModal(props) {
    const { onClose, roster } = props;
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            rostername: '',
            faction: null,
            team: null,
        },
        validate: {
            rostername: (value) => (!value ? 'Operative must have a name' : null),
            faction: (value) => (!value ? 'Must select an operative' : null)
        },
    });
    const { data: killteam } = useRequest(`/killteam.php?fa=${roster?.factionid}&kt=${roster?.killteamid}`);
    const operativeOptions = flatten(killteam?.fireteams.map((fireteam) => fireteam.operatives))?.map((operative, index) => ({
        label: operative.opname,
        value: index.toString()
    }));

    const handleAddOperative = form.onSubmit((values) => {
        form.reset();
        const operative = {};
        onClose(operative);
        modals.close("add-operative")
    });

    return (
        <>
            <form
                onSubmit={handleAddOperative}
            >
                <Stack>
                    <Select
                        label="Select Operative"
                        placeholder="Select Operative"
                        data={operativeOptions}
                        key={form.key('faction')}
                        {...form.getInputProps('faction')}
                    />
                    <TextInput
                        label="Operative Name"
                        placeholder="Operative Name"
                        key={form.key('rostername')}
                        {...form.getInputProps('rostername')}
                    />
                    <Group justify="flex-end">
                        <Button variant="default" onClick={() => modals.close("add-operative")}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </Group>
                </Stack>
            </form>
        </>
    );
}