import { Link, useLocation, useRoute } from "wouter";
import { API_PATH, useAPI, useRequest } from "../../hooks/use-api";
import { Container, Group, Image, LoadingOverlay, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import OperativeCard from "../../components/operative-card";
import React from "react";
import { IconCards, IconCopy, IconEdit, IconPhoto, IconPlus, IconPrinter, IconTrash } from "@tabler/icons-react";
import useAuth from "../../hooks/use-auth";
import { useAppContext } from "../../hooks/app-context";
import { useLocalStorage } from "@mantine/hooks";
import { OperativeModal, UpdateRosterModal } from "./modals";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

export default function Roster() {
    const { user: userData } = useAuth();
    const api = useAPI();
    const { appState, setAppState } = useAppContext();
    const [, params] = useRoute("/r/:rosterId");
    const { data: roster, setData: setRoster, isFetching: isFetchinigTeam } = useRequest(`/roster.php?rid=${params?.rosterId}&loadrosterdetail=1`);
    const [, setDashboardrosterId] = useLocalStorage({ key: 'dashboardrosterid' });
    const [, navigate] = useLocation();
    const canEdit = userData?.username === roster?.username;
    const handleUpdateRoster = (roster) => {
        api.request("/roster.php", {
            method: "POST",
            body: JSON.stringify(roster)
        }).then((data) => {
            if (data?.rosterid) {
                setRoster(data);
            }
        })
    }
    const handleAddOperative = React.useCallback((operative) => {
        const newOperative = {
            "userid": userData.userid,
            "rosterid": roster.rosterid,
            "factionid": operative.factionid,
            "killteamid": operative.killteamid,
            "fireteamid": operative.fireteamid,
            "opid": operative.opid,
            "opname": operative.opname,
            "wepids": operative?.weapons?.map((weapon) => weapon.wepid).join(","),
            "eqids": operative?.equipments?.map((equip) => equip.eqid).join(","),
            "notes": ""
        }
        api.request("/rosteroperative.php", {
            method: "POST",
            body: JSON.stringify(newOperative)
        }).then((data) => {
            if (data?.rosteropid) {
                notifications.show({
                    title: 'Added',
                    message: `Successfully added ${operative.opname}.`,
                  })
                setRoster({
                    ...roster,
                    operatives: [...roster?.operatives, data]
                });
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roster]);
    const handleEditOperative = React.useCallback((operative) => {
        const updatedOperative = {
            "rosteropid": operative.rosteropid,
            "userid": userData.userid,
            "rosterid": roster.rosterid,
            "factionid": operative.factionid,
            "killteamid": operative.killteamid,
            "fireteamid": operative.fireteamid,
            "opid": operative.opid,
            "opname": operative.opname,
            "wepids": operative?.weapons?.map((weapon) => weapon.wepid).join(","),
            "eqids": operative?.equipments?.map((equip) => equip.eqid).join(","),
            "notes": ""
        }
        api.request("/rosteroperative.php", {
            method: "POST",
            body: JSON.stringify(updatedOperative)
        }).then((data) => {
            if (data?.rosteropid) {
                notifications.show({
                    title: 'Updated',
                    message: `Successfully updated ${operative.opname}.`,
                  })
                setRoster({
                    ...roster,
                    operatives: roster.operatives?.map((op) => op.rosteropid === data.rosteropid ? data : op)
                });
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roster]);
    const handleShowEditOperative = (operative) => {
        modals.open({
            modalId: "edit-operative",
            size: "xl",
            title: <Title order={2}>Edit Operative</Title>,
            children: <OperativeModal roster={roster} operative={operative} onClose={handleEditOperative} />
        });
    };
    const handleDeleteOperative = (operative) => {
        api.request(`/rosteroperative.php?roid=${operative.rosteropid}`, {
            method: "DELETE"
        }).then((data) => {
            if (data?.success) {
                notifications.show({
                    title: 'Deleted',
                    message: `Successfully deleted ${operative.opname}.`,
                  })
                setRoster({
                    ...roster,
                    operatives: [...roster?.operatives?.filter((op) => op.rosteropid !== operative.rosteropid)]
                });
            }
        })
    }
    const handleConfirmDeleteOperative = (operative) => {
        modals.openConfirmModal({
            title: 'Confirm Delete',
            children: (
                <Text size="sm">
                    Are you sure you want to delete {operative.opname}?
                </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onConfirm: () => handleDeleteOperative(operative),
        });
    };
    const handleDeleteRoster = () => {
        api.request(`/roster.php?rid=${roster.rosterid}`, {
            method: "DELETE"
        }).then((data) => {
            if (data?.success) {
                navigate(`/u/${userData.username}`)
            }
        })
    }

    const handleConfirmDeleteRoster = () => {
        modals.openConfirmModal({
            title: 'Confirm Delete',
            children: (
                <Text size="sm">
                    Are you sure you want to delete {roster.rostername}?
                </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onConfirm: () => handleDeleteRoster(),
        });
    };
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
                                size: "xl",
                                title: <Title order={2}>Add Operative</Title>,
                                children: <OperativeModal roster={roster} onClose={handleAddOperative} />
                            });
                        }
                    },
                    {
                        icon: <IconEdit />,
                        text: "Edit Details",
                        onClick: () => {
                            modals.open({
                                modalId: "update-details",
                                size: "lg",
                                title: <Title order={2}>Update Details</Title>,
                                children: <UpdateRosterModal roster={roster} onClose={handleUpdateRoster} />
                            });
                        }
                    },
                    {
                        icon: <IconCards />,
                        text: "Deploy",
                        onClick: () => {
                            setDashboardrosterId(roster?.rosterid);
                            navigate('/dashboard')
                        }
                    }] : []),
                    {
                        icon: <IconPhoto />,
                        text: "Photo Gallery",
                        onClick: () => {}
                    },
                    {
                        icon: <IconCopy />,
                        text: "Duplicate",
                        onClick: () => {}
                    },
                    ...(canEdit ? [
                    {
                        icon: <IconPrinter />,
                        text: "Print",
                        onClick: () => { }
                    },
                    {
                        icon: <IconTrash />,
                        text: "Delete",
                        onClick: () => handleConfirmDeleteRoster()
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
    }, [canEdit, handleAddOperative]);
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
                        <OperativeCard editable={canEdit} operative={operative} onEdit={handleShowEditOperative} onDelete={handleConfirmDeleteOperative} />
                    ))}
                </SimpleGrid>
            </Stack>
        </Container>
    );
}
