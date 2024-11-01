import {
    IconBook,
    IconBrandDiscord,
    IconBrandGithub,
    IconCode,
    IconDice2,
    IconDownload,
    IconLock,
    IconSettings,
    IconTools,
    IconUser,
    IconUsers,
} from '@tabler/icons-react';
import classes from './navbar.module.css';
import { Link, useLocation } from 'wouter';
import useAuth from '../../hooks/use-auth';
import PWAInstallerPrompt from '../install-prompt';
import { NavLink, Stack } from '@mantine/core';

export function NavbarSimple(props) {
    const [location] = useLocation();
    const { user, logout, isLoggedIn } = useAuth();
    const loggedIn = isLoggedIn();
    const data = [
        { link: '/dashboard', label: 'Play', icon: IconDice2, loggedIn: true },
        { link: `/u/${user?.username}`, label: 'Rosters', icon: IconUsers, loggedIn: true },
        { link: '/allfactions', label: 'Factions', icon: IconBook },
        {
            label: 'Tools', icon: IconTools, children: [
                { link: '/name', label: 'Name Generator', icon: IconCode }
            ]
        },
        { link: '/settings', label: 'Settings', icon: IconSettings },
    ];
    const renderLink = (item) => {
        return (
            <>
                {!!item.children ? <NavLink
                    component={Link}
                    description={item.description}
                    data-active={location.includes(item.link) || undefined}
                    key={item.label}
                    label={item.label}
                    leftSection={<item.icon />}
                >
                    {item.children.map((child) => renderLink(child))}
                </NavLink> : <NavLink
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
            </>
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
                        href="/register"
                        data-active={location === "/register" || undefined}
                        label="Register"
                        leftSection={<IconUser />}
                        onClick={() => {
                            props?.close();
                        }}
                    />
                </> : <NavLink
                    component={Link}
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