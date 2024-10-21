import { Group, Text, UnstyledButton } from "@mantine/core";
import { useAppContext } from "../../hooks/app-context";

export default function AppBarMenu() {
    const { appState } = useAppContext();

    return (
        <Group style={{ color: 'white' }}>
            {appState?.contextActions?.map((action) => (
                <UnstyledButton title={action?.text} onClick={action?.onClick}>
                    <Group gap={2}>{action?.icon} <Text visibleFrom="sm">{action?.text}</Text></Group>
                </UnstyledButton>
            ))}
        </Group>
    );

}