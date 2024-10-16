import { PasswordInput, Container, TextInput, Stack, Button } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import useAuth from '../../hooks/use-auth';
import { useLocation } from 'wouter';


export default function Register() {
    const { signup } = useAuth();
    const [, navigate] = useLocation();
    const [username, setUsername] = useInputState('');
    const [password, setPassword] = useInputState('');
    const [password2, setPassword2] = useInputState('');

    const submit = async () => {
        const success = await signup(username, password);
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
                <PasswordInput
                    value={password2}
                    onChange={setPassword2}
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    required
                />
                <Button onClick={() => submit(username, password)}>Sign Up</Button>
            </Stack>
        </Container>
    );
}