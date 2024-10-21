import { Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { useAppContext } from "../../hooks/app-context";
import { IconDotsVertical } from "@tabler/icons-react";
import useWindowDimensions from "../../hooks/get-window-dimensions";

export default function AppBarMenu() {
    const { appState } = useAppContext();
    const { width } = useWindowDimensions();
    const isDesktop = width > 768;
    const numButtonstoShow = isDesktop ? 6 : 3;
    const contextActionsButtons = appState?.contextActions?.slice(0, numButtonstoShow);
    const contextActionsMenuButtons = appState?.contextActions?.slice(numButtonstoShow);

    return (
        <Group style={{ color: 'white' }}>
            {contextActionsButtons?.map((action) => (
                <UnstyledButton title={action?.text} onClick={action?.onClick}>
                    <Group gap={2}>{action?.icon} <Text visibleFrom="sm">{action?.text}</Text></Group>
                </UnstyledButton>
            ))}
            {appState?.contextActions?.length > numButtonstoShow &&
                <>
                    <UnstyledButton title="More Options">


                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <Group gap={2}><IconDotsVertical /></Group>
                            </Menu.Target>

                            <Menu.Dropdown>
                                {contextActionsMenuButtons?.map((action) => (
                                    <Menu.Item leftSection={action?.icon} onClick={action?.onClick}>
                                        {action.text}
                                    </Menu.Item>
                                ))}
                            </Menu.Dropdown>
                        </Menu>
                    </UnstyledButton>
                </>
            }
        </Group>
    );

}