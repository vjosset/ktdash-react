import { Link, useLocation, useRoute } from "wouter";
import { API_PATH, request, useRequest } from "../../hooks/use-api";
import { Container, Group, Image, LoadingOverlay, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import OperativeCard from "../../components/operative-card";
import React from "react";
import { IconCamera, IconCards, IconCopy, IconEdit, IconListCheck, IconPhoto, IconPlus, IconPrinter, IconTrash } from "@tabler/icons-react";
import useAuth from "../../hooks/use-auth";
import { useAppContext } from "../../hooks/app-context";
import { useLocalStorage } from "@mantine/hooks";
import { OperativeModal, UpdateRosterModal, UpdateRosterPotraitModal } from "./modals";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import useWindowDimensions from "../../hooks/get-window-dimensions";

export default function Roster() {
    const { user: userData } = useAuth();
    const { appState, setAppState } = useAppContext();
    const [, params] = useRoute("/r/:rosterId");
    const { data: roster, setData: setRoster, isFetching: isFetchinigTeam } = useRequest(`/roster.php?rid=${params?.rosterId}&loadrosterdetail=1`);
    const [, setDashboardrosterId] = useLocalStorage({ key: 'dashboardrosterid' });
    const [, navigate] = useLocation();
    const canEdit = userData?.username === roster?.username;
    const { width } = useWindowDimensions();
    const isSmallScreen = width <= 600;
    const [imageExpire, setImageExpire] = React.useState('');
    const showTeamComp = () =>
        modals.open({
            size: "lg",
            title: 'Team Composition',
            children: (
                <div dangerouslySetInnerHTML={{ __html: `${roster?.killteam?.killteamcomp}` }} />
            ),
        });
    const handleShowUpdateRosterPortrait = React.useCallback(() => {
        modals.open({
            modalId: "update-portrait",
            size: "xl",
            title: <Title order={2}>Edit Portrait</Title>,
            children: <UpdateRosterPotraitModal roster={roster} onClose={(expire) => setImageExpire(expire)} />
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roster])
    const handleUpdateRoster = (roster) => {
        request("/roster.php", {
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
            "notes": operative.notes
        }
        request("/rosteroperative.php", {
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
            ...operative,
            "wepids": operative?.weapons?.map((weapon) => weapon.wepid).join(","),
            "eqids": operative?.equipments?.map((equip) => equip.eqid).join(",")
        }
        request("/rosteroperative.php", {
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
            fullScreen: isSmallScreen,
            modalId: "edit-operative",
            size: "xl",
            title: <Title order={2}>Edit Operative</Title>,
            children: <OperativeModal roster={roster} operative={operative} onClose={handleEditOperative} />
        });
    };
    const handleDeleteOperative = (operative) => {
        request(`/rosteroperative.php?roid=${operative.rosteropid}`, {
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
        request(`/roster.php?rid=${roster.rosterid}`, {
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
                                fullScreen: isSmallScreen,
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
                    },
                    {
                        icon: <IconListCheck />,
                        text: "Team Composition",
                        onClick: () => showTeamComp()
                    },
                    {
                        icon: <IconCamera />,
                        text: "Edit Portrait",
                        onClick: () => handleShowUpdateRosterPortrait()
                    }] : []),
                {
                    icon: <IconPhoto />,
                    text: "Photo Gallery",
                    onClick: () => navigate(`/r/${roster.rosterid}/g`)
                },
                {
                    icon: <IconCopy />,
                    text: "Duplicate",
                    onClick: () => { }
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
    }, [canEdit, isSmallScreen, handleAddOperative, handleShowUpdateRosterPortrait]);
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
                    <Image onClick={() => modals.open({
                        size: "xl",
                        title: <Title order={2}>{roster.rostername}</Title>,
                        children: <Image
                            fit="cover"
                            style={{ objectPosition: "top" }}
                            radius="md"
                            src={`${API_PATH}/rosterportrait.php?rid=${roster.rosterid}&expire=${imageExpire}`}
                        />
                    })} fit="cover" style={{ objectPosition: "top", cursor: 'pointer' }} h={300} radius="md" src={`${API_PATH}/rosterportrait.php?rid=${roster.rosterid}&expire=${imageExpire}`} />
                    <Stack justify="flex-start" align="flex-start">
                        <Group gap="xs" align="end">
                            <Title>
                                {roster?.rostername}
                            </Title>
                        </Group>
                        <Group>
                            <Text><Link href={`/fa/${roster.factionid}/kt/${roster.killteamid}`}>{roster.killteamname} <sup>{roster.edition}</sup></Link> by <Link href={`/u/${roster.username}`}>{roster.username}</Link></Text>
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
