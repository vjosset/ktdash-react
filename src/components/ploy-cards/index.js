import { Badge, Card, Checkbox, Group, SimpleGrid, Stack, Title } from "@mantine/core";
import { convertShapes } from "../../utils/shapes";
import classes from './ploy-card.module.css';

export default function PloyCards(props) {
    const { killteam, selectable = false, selectedPloys: selectedPloyIds = "", onSelect = () => { } } = props;
    const selectedPloys = new Set(selectedPloyIds.split(','));
    return (
        <Stack my="md">
            <Title order={2}>Strategic Ploys</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                {killteam?.ploys?.strat?.map((ploy) => (
                    <>
                        {selectable ? <Checkbox.Card className={classes.root} p="sm" onClick={() => onSelect(ploy, !selectedPloys.has(ploy.ployid))} checked={selectedPloys.has(ploy.ployid)}>
                            <Stack align="flex-start">
                                <Group>
                                    <Checkbox.Indicator />
                                    <Title className={classes.label} order={3}>{ploy.ployname}</Title>
                                    <Badge size="lg" radius="sm">{`${ploy.CP} CP`}</Badge>
                                </Group>
                                <div dangerouslySetInnerHTML={{ __html: `${convertShapes(ploy.description)}` }} />
                            </Stack>
                        </Checkbox.Card> : <Card>
                            <Stack align="flex-start">
                                <Title order={3}>{ploy.ployname}</Title>
                                <div dangerouslySetInnerHTML={{ __html: `${convertShapes(ploy.description)}` }} />
                            </Stack>
                        </Card>}
                    </>
                ))}
            </SimpleGrid>
            <Title order={2}>Firefight Ploys</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                {killteam?.ploys?.tac?.map((ploy) => (
                    <Card>
                        <Stack>
                            <Group>
                                <Title order={3}>{ploy.ployname}</Title>
                                <Badge size="lg" radius="sm">{`${ploy.CP} CP`}</Badge>
                            </Group>
                            <div dangerouslySetInnerHTML={{ __html: `${convertShapes(ploy.description)}` }} />
                        </Stack>
                    </Card>
                ))}
            </SimpleGrid>
        </Stack>
    );
}