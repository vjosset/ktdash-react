import {
    IconBook,
    IconBrandDiscord,
    IconBrandGithub,
    IconCode,
    IconDownload,
    IconHelp,
    IconLock,
    IconSettings,
    IconTools,
    IconUser,
    IconUsers,
} from '@tabler/icons-react';
import classes from './navbar.module.css';
import useAuth from '../../hooks/use-auth';
import PWAInstallerPrompt from '../install-prompt';
import { NavLink, Stack } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { Fragment } from 'react';

export function NavbarSimple(props) {
    const location = usePathname()
    const { user, logout, isLoggedIn } = useAuth();
    const loggedIn = isLoggedIn();
    const data = [
        { link: `/u/${user?.username}`, label: 'Rosters', icon: IconUsers, loggedIn: true },
        { link: '/allfactions', label: 'Factions', icon: IconBook },
        {
            label: 'Tools', icon: IconTools, children: [
                { link: '/name', label: 'Name Generator', icon: IconCode }
            ]
        },
        { link: '/settings', label: 'Settings', icon: IconSettings },
        { link: '/help', label: 'Help', icon: IconHelp },
    ];
    const renderLink = (item, index) => {
        return (
            <Fragment key={index}>
                {!!item.children ? <NavLink
                    description={item.description}
                    data-active={location.includes(item.link) || undefined}
                    key={item.label}
                    label={item.label}
                    leftSection={<item.icon />}
                >
                    {item.children.map((child, childIndex) => (<Fragment key={childIndex}>{renderLink(child)}</Fragment>))}
                </NavLink> : 
                <NavLink
                    component={Link}
                    description={item.description}
                    data-active={location.includes(item.link) || undefined}
                    href={item.link}
                    key={item.label}
                    label={item.label}
                    onClick={() => {
                        props?.close();
                    }}
                    leftSection={<item.icon />}
                />}
            </Fragment>
        )
    }
    const links = data.filter((link) => !link.loggedIn || loggedIn).map(renderLink);
    return (
        <Stack display="flex" flex={1}>
            <Stack gap={0}>
                {links}
            </Stack>
            <Stack gap={0} className={classes.navsection}>
                <NavLink
                    target="_blank"
                    href={"https://discord.gg/zyuVDgYNeY"}
                    label="Discord"
                    leftSection={<IconBrandDiscord />}
                />
                <NavLink
                    target="_blank"
                    href={"https://github.com/jaaimino/ktdash-react"}
                    label="Github"
                    leftSection={<IconBrandGithub />}
                />
                <PWAInstallerPrompt
                    render={({ onClick }) => (
                        <NavLink leftSection={<IconDownload />} onClick={onClick} label="App Install">
                        </NavLink>
                    )}
                    callback={() => { }}
                />
            </Stack>
            <Stack gap={0} className={classes.navsection}>
                {!loggedIn ? <>
                    <NavLink
                        component={Link}
                        href="/login"
                        data-active={location === "/login" || undefined}
                        leftSection={<IconLock />}
                        label="Log In"
                        onClick={() => {
                            props?.close();
                        }}
                    />
                    <NavLink
                        component={Link}
                        href="/signup"
                        data-active={location === "/signup" || undefined}
                        label="Sign Up"
                        leftSection={<IconUser />}
                        onClick={() => {
                            props?.close();
                        }}
                    />
                </> : <NavLink
                    onClick={() => {
                        logout();
                        props?.close();
                    }}
                    label="Log Out"
                    leftSection={<IconLock component={Link} />}
                />}
            </Stack>
        </Stack>
    );
}