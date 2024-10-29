import { Card, Checkbox, Group, SimpleGrid, Stack, Title } from "@mantine/core";
import { groupBy } from "lodash";
import { convertShapes } from "../../utils/shapes";

export default function TacOpCards(props) {
    const { tacops: tacOpData, selectable = false, onUpdate = () => { } } = props;
    const tacops = groupBy(tacOpData, 'archetype');
    return (
        <Stack my="md">
            {Object.keys(tacops || {})?.map((tacopCategory) => {
                const ops = tacops[tacopCategory];
                return (
                    <>
                        <Title order={2}>{tacopCategory}</Title>
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                            {ops?.map((tacop) => (
                                <>
                                    {selectable ? <Card style={{ cursor: 'pointer' }} onClick={() => onUpdate({
                                        ...tacop,
                                        active: !tacop.active
                                    })}>
                                        <Stack align="flex-start">
                                            <Group>
                                                <Checkbox.Indicator checked={!!tacop.active} />
                                                <Title order={4}>{tacop.title}</Title>
                                            </Group>
                                            <div dangerouslySetInnerHTML={{ __html: `${convertShapes(tacop.description)}` }} />
                                        </Stack>
                                    </Card> : <Card>
                                        <Stack align="flex-start">
                                            <Title order={3}>{tacop.title}</Title>
                                            <div dangerouslySetInnerHTML={{ __html: `${convertShapes(tacop.description)}` }} />
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