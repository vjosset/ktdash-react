import { Button, Group, Menu, Text } from "@mantine/core";
import { useAppContext } from "../../hooks/app-context";
import { IconDotsVertical } from "@tabler/icons-react";
import useWindowDimensions from "../../hooks/get-window-dimensions";

export default function AppBarMenu() {
    const { appState } = useAppContext();
    const { width } = useWindowDimensions();
    const numButtonstoShow = Math.floor(width / 156);
    const contextActionsButtons = appState?.contextActions?.slice(0, numButtonstoShow);
    const contextActionsMenuButtons = appState?.contextActions?.slice(numButtonstoShow);

    return (
        <Group style={{ color: 'white' }} gap={5}>
            {contextActionsButtons?.map((action) => (
                <Button style={{ padding: '5px' }} variant="subtle" color="white" title={action?.text} onClick={action?.onClick}>
                    <Group gap={5}>{action?.icon} <Text visibleFrom="sm">{action?.text}</Text></Group>
                </Button>
            ))}
            {appState?.contextActions?.length > numButtonstoShow &&
                <>
                    <Button style={{ padding: '5px' }} color="white" variant="subtle" title="More Options">
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <Group gap={5}><IconDotsVertical /></Group>
                            </Menu.Target>

                            <Menu.Dropdown>
                                {contextActionsMenuButtons?.map((action) => (
                                    <Menu.Item leftSection={action?.icon} onClick={action?.onClick}>
                                        {action.text}
                                    </Menu.Item>
                                ))}
                            </Menu.Dropdown>
                        </Menu>
                    </Button>
                </>
            }
        </Group>
    );

}