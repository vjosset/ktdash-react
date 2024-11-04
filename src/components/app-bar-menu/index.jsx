'use client'
import { Burger, Button, Group, Image, Menu, Text, Title } from "@mantine/core";
import { useAppContext } from "../../hooks/app-context";
import { IconDotsVertical } from "@tabler/icons-react";
import { useRef } from "react";
import Link from "next/link";
import MainLogo from '../../assets/icon-96x96.png';
import NextImage from 'next/image';
import useWindowDimensions from "@/hooks/get-window-dimensions";

export default function AppBarMenu(props) {
    const { opened, toggle } = props;
    const { appState } = useAppContext();
    
    const button = useRef(null);

    const { width } = useWindowDimensions();

    // Stupid ref hack because you can't manually close the nav :|
    const closeNav = () => {
        if (opened) {
            button?.current?.click();
        }
    }
    const numButtonstoShow = width >= 700 ? (width / 170) : (width / 125);
    const contextActionsButtons = appState?.contextActions?.slice(0, numButtonstoShow);
    const contextActionsMenuButtons = appState?.contextActions?.slice(numButtonstoShow);

    return (
        <Group h="100%" px="md" gap={5} align="center" justify="space-between" style={{ flex: 1 }} wrap="nowrap">
            <Group justify="center" gap={5}>
                <Burger opened={opened} onClick={toggle} ref={button} hiddenFrom="md" size="sm" />
                <Link onClick={() => closeNav()} style={{ display: 'flex', textDecoration: 'none', color: 'white', alignItems: 'center' }} href="/">
                    <Group gap={5}>
                        <Image alt="App Logo" h={40}
                            component={NextImage}
                            w="auto"
                            fit="contain" src={MainLogo} />
                        <Title fontFamily="Anton" order={2}>KTDASH</Title>
                    </Group>
                </Link>
            </Group>
            <Group style={{ color: 'white' }} gap={5}>
                {contextActionsButtons?.map((action, index) => (
                    <Button key={index} style={{ padding: '5px' }} variant="subtle" color="white" title={action?.text} onClick={action?.onClick}>
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
                                    {contextActionsMenuButtons?.map((action, index) => (
                                        <Menu.Item key={index} leftSection={action?.icon} onClick={action?.onClick}>
                                            {action.text}
                                        </Menu.Item>
                                    ))}
                                </Menu.Dropdown>
                            </Menu>
                        </Button>
                    </>
                }
            </Group>
        </Group>
    );

}