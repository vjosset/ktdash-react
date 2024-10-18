import { useRoute } from "wouter";
import { API_PATH, useRequest } from "../../hooks/use-api";
import { Container, Image, LoadingOverlay, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import OperativeCard from "../../components/operative-card";

export default function Roster() {
    const [, params] = useRoute("/r/:rosterId");
    const { data: roster, isFetching: isFetchinigTeam } = useRequest(`/roster.php?rid=${params?.rosterId}&loadrosterdetail=1`);
    if (isFetchinigTeam) {
        return (<LoadingOverlay visible={isFetchinigTeam} />);
    }
    if (!roster) {
        return;
    }

    return (
        <Container py="md" px="md" fluid>
            <Stack>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <Image fit="cover" style={{ objectPosition: "top" }} h={300} radius="md" src={`${API_PATH}/rosterportrait.php?rid=${roster.rosterid}`} />
                    <Stack justify="flex-start" align="flex-start">
                        <Title>
                            {roster?.rostername}
                        </Title>
                        <Text>
                            {roster?.notes}
                        </Text>
                    </Stack>
                </SimpleGrid>
                <SimpleGrid mt="md" cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="md">
                    {roster?.operatives?.map((operative) => (
                        <OperativeCard operative={operative} />
                    ))}
                </SimpleGrid>
            </Stack>
        </Container>
    );
}
