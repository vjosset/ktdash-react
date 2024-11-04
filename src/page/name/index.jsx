'use client'
import { requestText } from '@/hooks/use-api';
import { Button, Container, Select, Stack, TextInput, Title } from '@mantine/core';
import { noop } from 'lodash';
import React, { useState } from 'react';

const NAME_OPTIONS = [
    { value: "AELDARI-M", label: "Aeldari - Male" },
    { value: "AELDARI-F", label: "Aeldari - Female" },
    { value: "BEASTMEN", label: "Beastmen" },
    { value: "DARKAELDARI-M", label: "Dark Aeldari - Male" },
    { value: "DARKAELDARI-F", label: "Dark Aeldari - Female" },
    { value: "HEARTHKYN", label: "Hearthkyn" },
    { value: "HUMAN-M", label: "Human - Male" },
    { value: "HUMAN-F", label: "Human - Female" },
    { value: "TYRANID", label: "Tyranid" },
    { value: "SISTERSOFBATTLE", "label": "Sisters of Battle" },
    { value: "SPACEMARINES", label: "Space Marines" },
    { value: "KROOT", label: "Kroot" },
    { value: "TAU", label: "Tau" },
    { value: "TAU-FIRE", label: "Tau - Fire Warrior" },
    { value: "KASRKIN", label: "Kasrkin" },
    { value: "HIEROTEK", label: "Necron - Hierotek Circle" },
    { value: "NECRON", label: "Necron" },
    { value: "ORK", label: "Ork" },
    { value: "ADMECH", label: "Adeptus Mechanicus" },
    { value: "CHAOSMARINES", label: "Chaos Space Marines" },
    { value: "DAEMONETTE", label: "Chaos Daemonette" },
    { value: "DAEMON", label: "Chaos Daemon" }
];


export default function NameGenerator() {
    const [name, setName] = useState('');
    const [nameType, setNameType] = useState("HUMAN-M");

    const handleGenerateName = () => {
        fetchName().then((data) => {
            setName(data);
        })
    }

    const fetchName = async () => {
        return await requestText(`/name.php?nametype=${nameType}`);
    }

    return (
        <Container py="md">
            <Stack>
                <Title>Name Generator</Title>
                <Select value={nameType} onChange={(value) => setNameType(value)} data={NAME_OPTIONS} label="Name Type" />
                <Button onClick={handleGenerateName}>Generate Name</Button>
                <TextInput value={name} onChange={noop}/>
            </Stack>
        </Container>
    );
}