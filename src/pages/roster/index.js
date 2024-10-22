import { Link, useLocation, useRoute } from "wouter";
import { API_PATH, useRequest } from "../../hooks/use-api";
import { Container, Group, Image, LoadingOverlay, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import OperativeCard from "../../components/operative-card";
import React from "react";
import { IconCards, IconEdit, IconPlus, IconPrinter, IconTrash } from "@tabler/icons-react";
import useAuth from "../../hooks/use-auth";
import { useAppContext } from "../../hooks/app-context";
import { useLocalStorage } from "@mantine/hooks";
import { AddOperativeModal } from "./modals";
import { modals } from "@mantine/modals";

export default function Roster() {
    const { user: userData } = useAuth();
    const { appState, setAppState } = useAppContext();
    const [, params] = useRoute("/r/:rosterId");
    const { data: roster, isFetching: isFetchinigTeam } = useRequest(`/roster.php?rid=${params?.rosterId}&loadrosterdetail=1`);
    const [, setDashboardrosterId] = useLocalStorage({ key: 'dashboardrosterid' });
    const [, navigate] = useLocation();
    const canEdit = userData?.username === roster?.username;
    const handleAddOperative = (operative) => {
        console.log(operative);
        // api.request("/roster.php", {
        //     method: "POST",
        //     body: JSON.stringify(roster)
        // }).then((data) => {
        //     if (data?.rosterid) {
        //         navigate(`/r/${data?.rosterid}`)
        //     }
        // })
    }
    React.useEffect(() => {
        setAppState({
            ...appState,
            contextActions: [
                ...(canEdit ? [
                    {
                        icon: <IconPlus />,
                        text: "Add Operative",
                        onClick: () => {
                            modals.open({
                                modalId: "add-operative",
                                size: "lg",
                                title: <Title order={2}>Add Operative</Title>,
                                children: <AddOperativeModal roster={roster} onClose={handleAddOperative} />
                            });
                        }
                    },
                    {
                        icon: <IconEdit />,
                        text: "Edit Details",
                        onClick: () => { }
                    },
                    {
                        icon: <IconCards />,
                        text: "Deploy",
                        onClick: () => {
                            setDashboardrosterId(roster?.rosterid);
                            navigate('/dashboard')
                        }
                    },
                    {
                        icon: <IconPrinter />,
                        text: "Print",
                        onClick: () => { }
                    },
                    {
                        icon: <IconTrash />,
                        text: "Delete",
                        onClick: () => { }
                    },
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
    const handleEditOperative = () => {
        console.log("Editing operative");
    };
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
                        <Group gap="xs" align="end">
                            <Title>
                                {roster?.rostername}
                            </Title>
                        </Group>
                        <Group>
                            <Text><Link href={`/fa/${roster.factionid}/kt/${roster.killteamid}`}>{roster.killteamname}</Link> by <Link href={`/u/${roster.username}`}>{roster.username}</Link></Text>
                        </Group>
                        {!!roster.notes && <Text>
                            {roster.notes}
                        </Text>}
                        {!roster.notes && <div dangerouslySetInnerHTML={{ __html: `${roster.killteamdescription}` }} />}
                    </Stack>
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="md">
                    {roster?.operatives?.map((operative) => (
                        <OperativeCard onEdit={canEdit ? handleEditOperative : undefined} operative={operative} />
                    ))}
                </SimpleGrid>
            </Stack>
        </Container>
    );
}
