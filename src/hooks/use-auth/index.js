import React from "react";
import { useAPI } from "../use-api";
import { useLocalStorage } from "@mantine/hooks";

export default function useAuth() {
    const api = useAPI();

    const [user, setUser] = useLocalStorage({ key: 'auth' });

    React.useEffect(() => {
        if (!user?.userid) {
            getSession().then((data) => {
                setUser(data);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getSession = async () => {
        const auth = await api.request('/session.php', {
            method: "GET"
        });
        return auth;
    }

    const signup = async (username, password) => {
        const auth = await api.request('/auth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: new URLSearchParams({
                username,
                password
            }).toString()
        });
        return auth;
    }
    const login = async (username, password) => {
        const auth = await api.request('/session.php', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: new URLSearchParams({
                username,
                password
            }).toString()
        });
        return auth;
    }
    const logout = async () => {
        const auth = await api.request('/session.php', {
            method: "DELETE"
        });
        setUser(undefined);
        return auth;
    }
    const isLoggedIn = () => {
        return !!user?.userid;
    }
    return { user, login, logout, signup, isLoggedIn };
}