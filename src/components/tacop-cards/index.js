import { Card, SimpleGrid, Stack, Title } from "@mantine/core";
import { groupBy } from "lodash";

export default function TacOpCards(props) {
    const { tacops: tacOpData } = props;
    const tacops = groupBy(tacOpData, 'archetype');
    return (
        <Stack my="md">
            {Object.keys(tacops || {})?.map((tacopCategory) => {
                const ops = tacops[tacopCategory];
                return (
                    <>
                        <Title order={2}>{tacopCategory}</Title>
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                            {ops?.map((ploy) => (
                                <Card>
                                    <Stack>
                                        <Title order={3}>{ploy.title}</Title>
                                        <div dangerouslySetInnerHTML={{ __html: `${ploy.description}` }} />
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