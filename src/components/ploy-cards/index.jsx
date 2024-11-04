import { Badge, Card, Checkbox, Group, SimpleGrid, Stack, Title } from "@mantine/core";
import { convertShapes } from "../../utils/shapes";
import classes from './ploy-card.module.css';
import { Fragment } from "react";

export default function PloyCards(props) {
    const { killteam, selectable = false, selectedPloys: selectedPloyIds = "", onSelect = () => { } } = props;
    const selectedPloys = new Set(selectedPloyIds.split(','));
    return (
        <Stack my="md">
            <Title order={2}>Strategic Ploys</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                {killteam?.ploys?.strat?.map((ploy, index) => (
                    <Fragment key={index}>
                        {selectable ? <Card className={classes.root} onClick={() => onSelect(ploy, !selectedPloys.has(ploy.ployid))}>
                            <Stack align="flex-start">
                                <Group>
                                    <Checkbox.Indicator checked={selectedPloys.has(ploy.ployid)} />
                                    <Title className={classes.label} order={4}>{ploy.ployname}</Title>
                                    <Badge size="lg" radius="sm" p={3}>{`${ploy.CP} CP`}</Badge>
                                </Group>
                                <div dangerouslySetInnerHTML={{ __html: `${convertShapes(ploy.description)}` }} />
                            </Stack>
                        </Card> : <Card>
                            <Stack align="flex-start">
                                <Group>
                                    <Title order={4}>{ploy.ployname}</Title>
                                    <Badge size="lg" radius="sm" p={3}>{`${ploy.CP} CP`}</Badge>
                                </Group>
                                <div dangerouslySetInnerHTML={{ __html: `${convertShapes(ploy.description)}` }} />
                            </Stack>
                        </Card>}
                    </Fragment>
                ))}
            </SimpleGrid>
            <Title order={2}>Firefight Ploys</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                {killteam?.ploys?.tac?.map((ploy, index) => (
                    <Card key={index}>
                        <Stack>
                            <Group>
                                <Title order={4}>{ploy.ployname}</Title>
                                <Badge size="lg" radius="sm" p={3}>{`${ploy.CP} CP`}</Badge>
                            </Group>
                            <div dangerouslySetInnerHTML={{ __html: `${convertShapes(ploy.description)}` }} />
                        </Stack>
                    </Card>
                ))}
            </SimpleGrid>
        </Stack>
    );
}