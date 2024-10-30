import { Redirect } from "wouter";
import { readLocalStorageValue } from "@mantine/hooks";

export function PrivateRoute(props) {
    const auth = readLocalStorageValue({ key: 'auth' });
    console.log(auth);
    return (
        auth?.userid ?
            <>{props.children}</> : <Redirect to="/login" />
    )
}