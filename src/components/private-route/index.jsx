'use client'
import { readLocalStorageValue } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PrivateRoute(props) {
    const auth = readLocalStorageValue({ key: 'auth' });
    const router = useRouter();
    useEffect(() => {
        if (!auth?.userid) {
            router.push('/login');
        }
    }, [auth, router])
    return (
        <>{props.children}</>
    )
}