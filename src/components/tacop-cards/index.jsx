import { Card, Checkbox, Group, SimpleGrid, Stack, Title } from "@mantine/core";
import { groupBy } from "lodash";
import { convertShapes } from "../../utils/shapes";
import { Fragment } from "react";

export default function TacOpCards(props) {
    const { tacops: tacOpData, selectable = false, onUpdate = () => { } } = props;
    const tacops = groupBy(tacOpData, 'archetype');
    return (
        <Stack my="md">
            {Object.keys(tacops || {})?.map((tacopCategory, index) => {
                const ops = tacops[tacopCategory];
                return (
                    <Fragment key={index}>
                        <Title order={2}>{tacopCategory}</Title>
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                            {ops?.map((tacop, indexTac) => (
                                <Fragment key={indexTac}>
                                    {selectable ? <Card key={indexTac} style={{ cursor: 'pointer' }} onClick={() => onUpdate({
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
                                </Fragment>
                            ))}
                        </SimpleGrid>
                    </Fragment>
                )
            })}
        </Stack>
    );
}