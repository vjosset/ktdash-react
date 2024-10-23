import { Card, SimpleGrid, Stack, Title } from "@mantine/core";
import { convertShapes } from "../../utils/shapes";

export default function EquipmentCards(props) {
    const { equipment: groupedEquipment } = props;
    return (
        <Stack my="md">
            {Object.keys(groupedEquipment)?.map((key) => {
                const equipment = groupedEquipment[key];
                return (
                    <>
                        <Title order={2}>{key}</Title>
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                            {equipment.map((equip) => (
                                <Card>
                                    <Stack>
                                        <Title order={3}>{equip.eqname}</Title>
                                        <div dangerouslySetInnerHTML={{ __html: `${convertShapes(equip.eqdescription)}` }} />
                                    </Stack>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </>
                )
            })}
        </Stack>
    );
}