'use client';
import { SWRConfig } from 'swr'
export const SWRProvider = ({ fallback, children }) => {
    return <SWRConfig value={{ fallback }}>{children}</SWRConfig>
};