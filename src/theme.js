'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
    fontFamily: 'Oswald, "Arial Narrow", Roboto, sans-serif',
    primaryColor: 'orange',
    breakpoints: {
        xs: '36em',  // Mantine Default: 36em
        sm: '48em',  // Mantine Default: 48em
        md: '62em',  // Mantine Default: 62em
        lg: '90em',  // Mantine Default: 75em
        xl: '114em', // Mantine Default: 88em
    }
});