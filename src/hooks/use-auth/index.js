import { useAPI } from "../use-api";

export default function useAuth() {
    const api = useAPI();

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
        return auth;
    }
    const isLoggedIn = () => {
        return !!document.cookie;
    }
    return { login, logout, signup, isLoggedIn };
}