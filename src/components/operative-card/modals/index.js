import { ActionIcon, Button, FileInput, Group, Image, Stack, Text, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconMinus, IconPhoto, IconPlus } from "@tabler/icons-react";
import { clamp } from "lodash";
import React from "react";
import { API_PATH, request } from "../../../hooks/use-api";
import { notifications } from "@mantine/notifications";

export function UpdateOperativePotraitModal(props) {
    const { onClose, operative } = props;

    const [portrait, setPortrait] = React.useState();

    const setFileUpload = (file) => {
        setPortrait({
            picturePreview: URL.createObjectURL(file),
            pictureAsFile: file
        })
    }

    const handleUploadOperativePortrait = () => {
        const formData = new FormData();
        formData.append(
            "file",
            portrait.pictureAsFile
        );
        request(`/operativeportrait.php?roid=${operative.rosteropid}`, {
            method: "POST",
            body: formData
        }).then((data) => {
            if (data?.success) {
                notifications.show({
                    title: 'Upload Succeeded',
                    message: `Successfully uploaded operative portrait.`,
                })
                modals.close("update-operative-portrait");
                onClose(Date.now())
            } else {
                notifications.show({
                    title: 'Upload Failed',
                    message: `${data}`,
                })
            }
        })
    };

    const handleDeleteOperativePortrait = () => {
        request(`/operativeportrait.php?roid=${operative.rosteropid}`, {
            method: "DELETE",
        }).then((data) => {
            if (data?.success) {
                notifications.show({
                    title: 'Delete Succeeded',
                    message: `Successfully deleted operative portrait.`,
                })
                modals.close("update-operative-portrait");
                onClose(Date.now())
            } else {
                notifications.show({
                    title: 'Delete Failed',
                    message: `${data}`,
                })
            }
        })
    };

    return (
        <>
            <Stack>
                <Image fit="cover" style={{ objectPosition: "top" }} h={300} radius="md" src={portrait?.picturePreview || `${API_PATH}/operativeportrait.php?roid=${operative.rosteropid}`} />
                <FileInput
                    leftSection={<IconPhoto />}
                    label="Operative Portrait"
                    placeholder="Upload Image"
                    value={portrait?.pictureAsFile}
                    onChange={setFileUpload}
                />
                <Text>Image will be resized to 900 x 600 px - Max upload file size: 5 MB
                    Rosters that have a photo of a painted mini for each operative and a group photo as a roster portrait will be added to the Roster Spotlight.
                    Please don't upload inappropriate photos. I look at every uploaded portrait and will delete suggestive, inappropriate, or offensive photos.</Text>
                <Group justify="flex-end">
                    <Button variant="default" onClick={() => modals.close("update-operative-portrait")}>Cancel</Button>
                    <Button color="red" onClick={handleDeleteOperativePortrait}>Delete Portrait</Button>
                    <Button type="submit" onClick={handleUploadOperativePortrait}>Save</Button>
                </Group>
            </Stack>
        </>
    );
}

export function UpdateWoundsModal(props) {
    const { onClose = () => { }, operative } = props;
    const [wounds, setWounds] = React.useState(operative.curW);
    const handleUpdateWounds = () => {
        onClose(wounds);
        modals.close('update-wounds');
    }
    return (
        <Stack justify="center" align="center" gap="xs">
            <Group p="md" gap="xs">
                <ActionIcon variant="default" size="lg" onClick={() => setWounds(Math.max(wounds - 1, 0))}><IconMinus />
                </ActionIcon>
                <TextInput type="number" w={50} value={wounds} onChange={(e) => setWounds(e.target.value)} onBlur={() => setWounds(clamp(wounds, 0, operative.W))} />
                <ActionIcon variant="default" size="lg" onClick={() => setWounds(Math.min(wounds + 1, operative.W))}><IconPlus />
                </ActionIcon>
            </Group>
            <Button fullWidth onClick={handleUpdateWounds}>Done</Button>
        </Stack>
    )
}