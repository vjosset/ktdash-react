import { Card, Checkbox, Group, SimpleGrid, Stack, Title } from "@mantine/core";
import { convertShapes } from "../../utils/shapes";
import classes from './equipment-card.module.css';
import React from "react";

export default function EquipmentCards(props) {
    const { equipment: groupedEquipment, selectable = false, onSelect = () => { } } = props;
    return (
        <Stack my="md">
            {Object.keys(groupedEquipment)?.map((key) => {
                const equipment = groupedEquipment[key];
                return (
                    <>
                        <Title order={2}>{key}</Title>
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                            {equipment.map((equip) => (
                                <>
                                    {selectable ? <Checkbox.Card className={classes.root} p="sm" onClick={() => onSelect(equip, !equip.selected)} checked={!!equip.selected}>
                                        <Group wrap="nowrap" align="flex-start">
                                            <Checkbox.Indicator />
                                            <Stack align="flex-start">
                                                <Title order={3}>{equip.eqname}</Title>
                                                <div dangerouslySetInnerHTML={{ __html: `${convertShapes(equip.eqdescription)}` }} />
                                            </Stack>
                                        </Group>
                                    </Checkbox.Card> : <Card className={classes.root} p="sm" onClick={() => onSelect(equip, !equip.selected)} checked={!!equip.selected}>
                                        <Stack align="flex-start">
                                            <Title order={3}>{equip.eqname}</Title>
                                            <div dangerouslySetInnerHTML={{ __html: `${convertShapes(equip.eqdescription)}` }} />
                                        </Stack>
                                    </Card>}
                                </>
                            ))}
                        </SimpleGrid>
                    </>
                )
            })}
        </Stack>
    );
}