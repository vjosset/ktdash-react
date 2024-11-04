import { isNil } from "lodash";
import React from "react";

export const API_PATH = "https://ktdash.app/api";

export const request = async (endpoint, content) => {
    let response = null;
    try {
        response = await fetch(`${API_PATH}${endpoint}`, {
            credentials: "include",
            method: "GET",
            ...content
        });
        if (response.status !== 200) {
            return response.statusText;
        }
        response = await response.json();
    } catch (error) {
        return error;
    }
    return response;
}

export const requestJSON = async (endpoint, content) => {
    let response = null;
    try {
        response = await fetch(`${API_PATH}${endpoint}`, {
            credentials: "include",
            method: "GET",
            ...content
        });
        if (response.status !== 200) {
            return response.statusText;
        }
        response = await response.json();
    } catch (error) {
        return error;
    }
    return response;
}

export const requestText = async (endpoint, content) => {
    let response = null;
    try {
        response = await fetch(`${API_PATH}${endpoint}`, {
            credentials: "include",
            method: "GET",
            ...content
        });
        if (response.status !== 200) {
            return response.statusText;
        }
        response = await response.text();
    } catch (error) {
        return error;
    }
    return response;
}

export function useRequest(endpoint, options = {}) {
    const { content, condition, initialData } = options;
    const [data, setData] = React.useState(initialData);
    const [error, setError] = React.useState(null);
    const [isFetching, setIsFetching] = React.useState(false);
    React.useEffect(() => {
        if (!isNil(initialData)) {
            return;
        }
        if ((!isNil(condition) && !condition)) {
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
