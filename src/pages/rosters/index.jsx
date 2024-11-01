import React from "react";
import { Container, LoadingOverlay, SimpleGrid, Text, Title } from "@mantine/core";

import { request, useRequest } from "../../hooks/use-api";
import { useLocation, useRoute } from "wouter";
import RosterCard from "../../components/roster-card";
import { useAppContext } from "../../hooks/app-context";
import { IconPlus, IconUsers } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { AddRosterModal } from "./modals";
import useAuth from "../../hooks/use-auth";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useSettings } from "../../hooks/use-settings";

export default function Rosters() {
    const [, navigate] = useLocation();
    const [settings] = useSettings();
    const { user: userData } = useAuth();
    const { appState, setAppState } = useAppContext();
    const [, setDashboardrosterId] = useLocalStorage({ key: 'dashboardrosterid' });
    const [, params] = useRoute("/u/:username");
    const { data: user, isFetching: isFetchingRosters, setData: setUser } = useRequest(`/user.php?username=${params?.username}`);
    const canEdit = userData?.username === params?.username;
    const rosters = user?.rosters ?? [];

    const handleCopyRoster = (roster) => {
        request(`/roster.php?rid=${roster.rosterid}&clone=1`, {
            method: "POST"
        }).then((data) => {
            if (data?.rosterid) {
                navigate(`/r/${data?.rosterid}`)
                notifications.show({
                    title: 'Created',
                    message: `Successfully copied ${roster.rostername}.`,
                  })
            }
        })
    }

    const handleCreateRoster = (roster) => {
        const newRoster = {
            ...roster,
            CP: settings.startcp,
            VP: settings.startvp
        }
        request("/roster.php", {
            method: "POST",
            body: JSON.stringify(newRoster)
        }).then((data) => {
            if (data?.rosterid) {
                navigate(`/r/${data?.rosterid}`)
                notifications.show({
                    title: 'Created',
                    message: `Successfully create ${roster.rostername}.`,
                  })
            }
        })
    }

    const handleDeleteRoster = (roster) => {
        request(`/roster.php?rid=${roster.rosterid}`, {
            method: "DELETE"
        }).then((data) => {
            if (data?.success) {
                notifications.show({
                    title: 'Deleted',
                    message: `Successfully deleted ${roster.rostername}.`,
                  })
                setUser({
                    ...user,
                    rosters: rosters?.filter((ros) => ros.rosterid !== roster.rosterid)
                })
            }
        })
    }

    const handleConfirmDeleteRoster = (roster) => {
        modals.openConfirmModal({
            title: 'Confirm Delete',
            children: (
                <Text size="sm">
                    Are you sure you want to delete {roster.rostername}?
                </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onConfirm: () => handleDeleteRoster(roster),
        });
    };

    const handleDeployRoster = (rosterid) => {
        setDashboardrosterId(rosterid);
        navigate('/dashboard')
    }

    React.useEffect(() => {
        setAppState({
            ...appState,
            contextActions: [
                ...(canEdit ? [{
                    icon: <IconPlus />,
                    text: "Create",
                    onClick: () => {
                        modals.open({
                            modalId: "create-roster",
                            size: "lg",
                            title: <Title order={2}>Create Roster</Title>,
                            children: <AddRosterModal onClose={handleCreateRoster} />
                        });
                    }
                }] : []),
                {
                    icon: <IconUsers />,
                    text: "Pre-Built Rosters",
                    onClick: () => navigate('/u/KTDash')
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
    }, [canEdit]);

    const cards = rosters?.map((roster) => (
        <RosterCard editable={canEdit} onCopy={(roster) => {
            modals.openConfirmModal({
                title: 'Confirm Copy',
                children: (
                    <Text size="sm">
                        Are you sure you want make a copy of {roster.rostername}?
                    </Text>
                ),
                labels: { confirm: 'Confirm', cancel: 'Cancel' },
                onConfirm: () => handleCopyRoster(roster),
            });
        }} roster={roster} onDelete={handleConfirmDeleteRoster} onDeploy={handleDeployRoster} />
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
