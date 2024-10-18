import { PasswordInput, Container, TextInput, Stack, Button } from '@mantine/core';
import useAuth from '../../hooks/use-auth';
import { useLocation } from 'wouter';
import { useForm } from '@mantine/form';


export default function Login() {
    const { login } = useAuth();
    const [, navigate] = useLocation();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
        }
    });

    const handleLogin = form.onSubmit((values) => {
        login(values.username, values.password).then((data) => {
            form.reset();
            if (data.username) {
                navigate('/');
            }
        });
    })

    return (
        <Container py="md">
            <form
                onSubmit={handleLogin}
            >
                <Stack>
                    <TextInput
                        label="Username"
                        placeholder="Username"
                        required
                        key={form.key('username')}
                        {...form.getInputProps('username')}
                    />
                    <PasswordInput
                        placeholder="Your password"
                        label="Password"
                        required
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                    <Button type="submit">Log In</Button>
                </Stack>
            </form>
        </Container>
    );
}