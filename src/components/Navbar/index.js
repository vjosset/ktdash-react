import {
    IconBook,
    IconDice2,
    IconLock,
    IconSettings,
    IconUser,
    IconUsers,
} from '@tabler/icons-react';
import classes from './navbar.module.css';
import { Link, useLocation } from 'wouter';
import useAuth from '../../hooks/use-auth';

export function NavbarSimple(props) {
    const [location] = useLocation();
    const { user, logout, isLoggedIn } = useAuth();
    const loggedIn = isLoggedIn();
    const data = [
        { link: '/allfactions', label: 'Factions', icon: IconBook },
        { link: '/dashboard', label: 'Dashboard', icon: IconDice2, loggedIn: true },
        { link: `/u/${user?.username}`, label: 'My Rosters', icon: IconUsers, loggedIn: true },
        { link: '/settings', label: 'Settings', icon: IconSettings, loggedIn: true },
    ];
    const links = data.filter((link) => !link.loggedIn || loggedIn).map((item) => (
        <Link
            className={classes.link}
            data-active={location.includes(item.link)  || undefined}
            href={item.link}
            key={item.label}
            onClick={() => {
                props?.close();
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                {links}
            </div>

            <div className={classes.footer}>
                {!loggedIn ? <>
                    <Link href="/login" className={classes.link} data-active={location === "/login" || undefined} onClick={() => {
                        props?.close();
                    }}>
                        <IconLock className={classes.linkIcon} stroke={1.5} />
                        <span>Log In</span>
                    </Link>
                    <Link href="/register" className={classes.link} data-active={location === "/register" || undefined} onClick={() => {
                        props?.close();
                    }}>
                        <IconUser className={classes.linkIcon} stroke={1.5} />
                        <span>Register</span>
                    </Link>
                </> : <Link className={classes.link} onClick={() => {
                    logout();
                    props?.close();
                }}>
                    <IconLock className={classes.linkIcon} stroke={1.5} />
                    <span>Log Out</span>
                </Link>}

            </div>
        </nav>
    );
}