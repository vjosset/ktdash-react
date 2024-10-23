import { ActionIcon, Button, Group, Stack, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { clamp } from "lodash";
import React from "react";

export function UpdateWoundsModal(props) {
    const { onClose = () => { }, operative } = props;
    const [wounds, setWounds] = React.useState(operative.curW);
    const handleUpdateWounds = () => {
        onClose(wounds);
        modals.close('update-wounds');
    }
    return (
        <Stack justify="center" align="center" gap="xs">
            <Group p="md" gap="xs">
                <ActionIcon variant="default" size="lg" onClick={() => setWounds(Math.max(wounds - 1, 0))}><IconMinus />
                </ActionIcon>
                <TextInput type="number" w={50} value={wounds} onChange={(e) => setWounds(e.target.value)} onBlur={() => setWounds(clamp(wounds, 0, operative.W))} />
                <ActionIcon variant="default" size="lg" onClick={() => setWounds(Math.min(wounds + 1, operative.W))}><IconPlus />
                </ActionIcon>
            </Group>
            <Button fullWidth onClick={handleUpdateWounds}>Done</Button>
        </Stack>
    )
}