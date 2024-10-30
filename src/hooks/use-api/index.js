import { isNil } from "lodash";
import React from "react";

export const API_PATH = "https://ktdash.app/api";

export const request = (endpoint, content) => {
    console.log('requesting', endpoint);
    return fetch(`${API_PATH}${endpoint}`, {
        credentials: "include",
        method: "GET",
        ...content
    }).then(response => response.json()).catch(e => console.log(e));
}
export const requestJson = (endpoint, content) => {
    return fetch(`${API_PATH}${endpoint}`, {
        credentials: "include",
        method: "GET",
        ...content
    }).then(response => response.json()).catch(e => console.log(e));
}
export const requestText = (endpoint, content) => {
    return fetch(`${API_PATH}${endpoint}`, {
        credentials: "include",
        method: "GET",
        ...content
    }).then(response => response.text()).catch(e => console.log(e));
}

export function useRequest(endpoint, content, fetchCondition) {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isFetching, setIsFetching] = React.useState(false);
    React.useEffect(() => {
        if (!isNil(fetchCondition) && !fetchCondition) {
            return;
        }
        setIsFetching(true);
        request(endpoint, content).then((data) => {
            setData(data);
            setIsFetching(false);
        }).catch((e) => {
            setError(e);
            setIsFetching(false);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoint]);
    return { data, error, isFetching, setData }
}
