import {
    IconBook,
    IconDice2,
    IconDownload,
    IconLock,
    IconSettings,
    IconUser,
    IconUsers,
} from '@tabler/icons-react';
import classes from './navbar.module.css';
import { Link, useLocation } from 'wouter';
import useAuth from '../../hooks/use-auth';
import PWAInstallerPrompt from '../install-prompt';
import { NavLink } from '@mantine/core';

export function NavbarSimple(props) {
    const [location] = useLocation();
    const { user, logout, isLoggedIn } = useAuth();
    const loggedIn = isLoggedIn();
    const data = [
        { link: '/dashboard', label: 'Play', icon: IconDice2, loggedIn: true },
        { link: `/u/${user?.username}`, label: 'Rosters', icon: IconUsers, loggedIn: true },
        { link: '/allfactions', label: 'Factions', icon: IconBook },
        { link: '/settings', label: 'Settings', icon: IconSettings },
    ];
    const links = data.filter((link) => !link.loggedIn || loggedIn).map((item) => (
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
        />
    ));

    return (
        <nav>
            <div>
                {links}
                <PWAInstallerPrompt
                    render={({ onClick }) => (
                        <NavLink leftSection={<IconDownload />} onClick={onClick} label="Install">
                        </NavLink>
                    )}
                    callback={() => { }}
                />
            </div>

            <div className={classes.footer}>
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
            </div>
        </nav>
    );
}