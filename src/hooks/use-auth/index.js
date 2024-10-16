import { useLocalStorage } from "@mantine/hooks";
import { useAPI } from "../use-api";

export default function useAuth() {
    const [authToken, setAuthToken] = useLocalStorage({ key: 'token' });
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
        if (auth?.access_token) {
            setAuthToken(auth.access_token);
        }
        return auth?.access_token;
    }
    const login = async (username, password) => {
        const auth = await api.request('/auth/token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: new URLSearchParams({
                username,
                password
            }).toString()
        });
        if (auth?.access_token) {
            setAuthToken(auth.access_token);
        }
        return auth?.access_token;
    }
    const logout = () => {
        setAuthToken('');
    }
    const isLoggedIn = () => {
        return !!authToken;
    }
    return { login, logout, signup, isLoggedIn };
}