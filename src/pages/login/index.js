import { PasswordInput, Container, TextInput, Stack, Button } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import useAuth from '../../hooks/use-auth';
import { useLocation } from 'wouter';


export default function Login() {
    const { login } = useAuth();
    const [, navigate] = useLocation();
    const [username, setUsername] = useInputState('');
    const [password, setPassword] = useInputState('');

    const submit = async () => {
        const success = await login(username, password);
        if (success) {
            navigate('/');
        }
    }

    return (
        <Container py="md">
            <Stack>
                <TextInput
                    value={username}
                    onChange={setUsername}
                    label="Username"
                    placeholder="Username"
                    required
                />
                <PasswordInput
                    value={password}
                    onChange={setPassword}
                    placeholder="Your password"
                    label="Password"
                    required
                />
                <Button onClick={() => submit()}>Log In</Button>
            </Stack>
        </Container>
    );
}