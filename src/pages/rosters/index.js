import React from "react";
import { Container, LoadingOverlay, SimpleGrid, Title } from "@mantine/core";

import { useRequest } from "../../hooks/use-api";
import { useRoute } from "wouter";
import RosterCard from "../../components/roster-card";
import { useAppContext } from "../../hooks/app-context";
import { IconPlus, IconUsers } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { AddRosterModal } from "./modals";

export default function Rosters() {
    const { appState, setAppState } = useAppContext();
    const [, params] = useRoute("/u/:username");
    const { data: user, isFetching: isFetchingRosters } = useRequest(`/user.php?username=${params?.username}`);
    const rosters = user?.rosters ?? [];

    React.useEffect(() => {
        setAppState({
            ...appState,
            contextActions: [
                {
                    icon: <IconPlus size={20} stroke={1.5} />,
                    text: "Create",
                    onClick: () => {
                        modals.open({
                            size: "lg",
                            title: <Title order={2}>Create Roster</Title>,
                            children: (
                                <AddRosterModal />
                            ),
                        });
                    }
                },
                {
                    icon: <IconUsers size={20} stroke={1.5} />,
                    text: "Pre-Built Rosters"
                }
            ]
        });
        return () => {
            setAppState({
                ...appState,
                contextActions: []
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cards = rosters?.map((roster) => (
        <RosterCard roster={roster} />
    ));
    if (isFetchingRosters) {
        return (<LoadingOverlay visible={isFetchingRosters} />);
    }

    return (
        <Container py="md" px="md" fluid>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3, xl: 4 }}>
                {cards}
            </SimpleGrid>
        </Container>
    );
}
