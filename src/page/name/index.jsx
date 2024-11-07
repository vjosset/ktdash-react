'use client'
import { requestText } from '@/hooks/use-api';
import { Button, Container, Select, Stack, TextInput, Title } from '@mantine/core';
import { noop } from 'lodash';
import React, { useState } from 'react';

const NAME_OPTIONS = [
    { value: "ADMECH", label: "Adeptus Mechanicus" },
    { value: "AELDARI-F", label: "Aeldari - Female" },
    { value: "AELDARI-M", label: "Aeldari - Male" },
    { value: "BEASTMEN", label: "Beastmen" },
    { value: "DAEMON", label: "Chaos Daemon" },
    { value: "DAEMONETTE", label: "Chaos Daemonette" },
    { value: "CHAOSMARINES", label: "Chaos Space Marines" },
    { value: "DARKAELDARI-F", label: "Dark Aeldari - Female" },
    { value: "DARKAELDARI-M", label: "Dark Aeldari - Male" },
    { value: "HEARTHKYN", label: "Hearthkyn" },
    { value: "HUMAN-F", label: "Human - Female" },
    { value: "HUMAN-M", label: "Human - Male" },
    { value: "KASRKIN", label: "Kasrkin" },
    { value: "KROOT", label: "Kroot" },
    { value: "NECRON", label: "Necron" },
    { value: "HIEROTEK", label: "Necron - Hierotek Circle" },
    { value: "ORK", label: "Ork" },
    { value: "SISTERSOFBATTLE", "label": "Sisters of Battle" },
    { value: "SPACEMARINES", label: "Space Marines" },
    { value: "TAU", label: "Tau" },
    { value: "TAU-FIRE", label: "Tau - Fire Warrior" },
    { value: "TYRANID", label: "Tyranid" }
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