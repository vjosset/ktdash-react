import { useLocation } from "wouter";
import { useRequest } from "../../hooks/use-api";
import { Container, LoadingOverlay, SimpleGrid, Stack } from "@mantine/core";
import OperativeCard from "../../components/operative-card";
import React from "react";
import { IconEdit, IconListCheck, IconRefresh, IconUserShare } from "@tabler/icons-react";
import useAuth from "../../hooks/use-auth";
import { useAppContext } from "../../hooks/app-context";
import { useLocalStorage } from "@mantine/hooks";

export default function Dashboard() {
    const { user: userData } = useAuth();
    const { appState, setAppState } = useAppContext();
    const [dashboardRosterId] = useLocalStorage({ key: 'dashboardrosterid' });
    const { data: roster, isFetching: isFetchinigTeam } = useRequest(`/roster.php?rid=${dashboardRosterId}&loadrosterdetail=1`, {}, !!dashboardRosterId);
    const [, navigate] = useLocation();
    const canEdit = userData?.username === roster?.username;
    React.useEffect(() => {
        setAppState({
            ...appState,
            contextActions: [
                ...(canEdit ? [
                    {
                        icon: <IconListCheck />,
                        text: "Select Operatives",
                        onClick: () => {}
                    },
                    {
                        icon: <IconUserShare />,
                        text: "Add Opponent",
                        onClick: () => {}
                    },
                    {
                        icon: <IconEdit />,
                        text: "Edit",
                        onClick: () => {
                            navigate(`/r/${dashboardRosterId}`)
                        }
                    },
                    {
                        icon: <IconRefresh />,
                        text: "Reset",
                        onClick: () => {}
                    }
                ] : [])
            ]
        });
        return () => {
            setAppState({
                ...appState,
                contextActions: []
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canEdit]);
    if (isFetchinigTeam) {
        return (<LoadingOverlay visible={isFetchinigTeam} />);
    }
    if (!roster) {
        return;
    }

    return (
        <Container py="md" px="md" fluid>
            <Stack>
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="md">
                    {roster?.operatives?.map((operative) => (
                        <OperativeCard collapsible operative={operative} />
                    ))}
                </SimpleGrid>
            </Stack>
        </Container>
    );
}
