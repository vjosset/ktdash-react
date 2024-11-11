'use client'
import { PasswordInput, Container, TextInput, Stack, Button, Alert } from '@mantine/core';
import useAuth from '../../hooks/use-auth';
import { useForm } from '@mantine/form';
import React from 'react';
import { useRouter } from 'next/navigation';


export default function Login() {
    const { login } = useAuth();
    const router = useRouter();
    const [errors, setErrors] = React.useState();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
        }
    });

    const handleLogin = form.onSubmit((values) => {
        login(values.username.trim(), values.password).then((data) => {
            form.reset();
            if (data?.username) {
                router.push('/');
            }
        }).catch(e => {
            setErrors(e.message);
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
                    {!!errors && <Alert color="red" variant="light">{errors}</Alert>}
                    <Button type="submit">Log In</Button>
                </Stack>
            </form>
        </Container>
    );
}