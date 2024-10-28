import { Card, SimpleGrid, Stack, Title } from "@mantine/core";
import { convertShapes } from "../../utils/shapes";

export default function PloyCards(props) {
    const { killteam } = props;
    return (
        <Stack my="md">
            <Title order={2}>Strategic Ploys</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                {killteam?.ploys?.strat?.map((ploy) => (
                    <Card>
                        <Stack>
                            <Title order={3}>{ploy.ployname}</Title>
                            <div dangerouslySetInnerHTML={{ __html: `${convertShapes(ploy.description)}` }} />
                        </Stack>
                    </Card>
                ))}
            </SimpleGrid>
            <Title order={2}>Firefight Ploys</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                {killteam?.ploys?.tac?.map((ploy) => (
                    <Card>
                        <Stack>
                            <Title order={3}>{ploy.ployname}</Title>
                            <div dangerouslySetInnerHTML={{ __html: `${convertShapes(ploy.description)}` }} />
                        </Stack>
                    </Card>
                ))}
            </SimpleGrid>
        </Stack>
    );
}