import { PasswordInput, Container, TextInput, Stack, Button, Alert } from '@mantine/core';
import useAuth from '../../hooks/use-auth';
import { useLocation } from 'wouter';
import { useForm } from '@mantine/form';
import React from 'react';


export default function Signup() {
    const { signup } = useAuth();
    const [, navigate] = useLocation();
    const [errors, setErrors] = React.useState();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
            confirmpassword: '',
        }
    });

    const handleSignup = form.onSubmit((values) => {
        signup(values.username.trim(), values.password, values.confirmpassword).then((data) => {
            form.reset();
            if (data?.userid) {
                navigate('/');
            } else {
                setErrors(data);
            }
        })
    })

    return (
        <Container py="md">
            <form
                onSubmit={handleSignup}
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
                    <PasswordInput
                        placeholder="Confirm password"
                        label="Confirm Password"
                        required
                        key={form.key('confirmpassword')}
                        {...form.getInputProps('confirmpassword')}
                    />
                    {!!errors && <Alert color="red" variant="light">{errors}</Alert>}
                    <Button type="submit">Sign Up</Button>
                </Stack>
            </form>
        </Container>
    );
}