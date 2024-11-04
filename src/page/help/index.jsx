import { Container, Group, Image, Stack, Text, Title } from "@mantine/core";
import { IconEye, IconFileImport, IconHelp, IconStar } from "@tabler/icons-react";
import Link from "next/link";
import classes from "./help.module.css";

export default function HelpPage() {
    return (
        <Container py="md" fluid>
            <Title>Frequently Asked Questions</Title>
            <div className={classes.columns}>
                <Stack className={classes.faqblock}>
                    <Title order={3}>Is there an app I can install on my phone?</Title>
                    <Text>KTDash does not have a native app (like you would find in the App Store for example), but it can be installed as a <Link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app#progressive_web_apps">Progressive Web App (PWA)</Link>.
                        PWAs are really just fancy shortcuts that look like a native app, but are actually running inside your browser.</Text>
                    <Text>(If anyone wants to build a native app, the API is publicly accessible so the back-end is ready. Contact me on Discord if you want more information).
                        To install this PWA on your phone, open the site in your phone&lsquo;s browser and look in your browser options for &ldquo;Install&ldquo; or something like that.</Text>
                    <Image alt="Install help image" src="/img/install_chrome.jpg" />
                </Stack>
                <Stack className={classes.faqblock}>
                    <Title order={3}>I forgot my password!</Title>
                    <Text>If you forgot your password and can&lsquo;t log in, send me a DM in our <Link href="https://discord.gg/zyuVDgYNeY" target="_blank">Discord</Link> and we&lsquo;ll work on resetting it together.
                        Since we don&lsquo;t collect email addresses (and I really don&lsquo;t want them), this is currently the only way to reset your password.</Text>
                </Stack>
                <Stack className={classes.faqblock}>
                    <Title order={3}>What do the icons mean on my roster?</Title>
                    <div>The icons on your roster indicate three things:
                        <ul>
                            <li><IconStar />: If a roster has a star icon, it means that roster was selected for the spotlight and will be featured on the killteam&lsquo;s &quot;Rosters&quot; tab and randomly selected to be shown on the home page</li>
                            <li><IconEye />: The eye icon indicates how many times the roster was viewed by another user</li>
                            <li><IconFileImport />: The &quot;arrow file&ldquo; icon indicates how many times the roster was imported by another user</li></ul></div>
                </Stack>
                <Stack className={classes.faqblock}>
                    <Title order={3}>I have an idea for a cool new feature or improvement</Title>
                    <Text>If you want to suggest a new feature or improvement, first check the <Link target="_blank" href="https://trello.com/b/YWHG6mhJ/backlog">Backlog</Link> to see if it is already logged there. If it is already there, you can vote that feature up to help prioritize the next thing to work on.
                        If you don&lsquo;t find your suggestion already in the backlog, come to the &quot;Feature Requests&quot; channel on the Discord and send it in!</Text>
                    <Text>Also note that the most commmonly-requested features have already been implemented in the Settings; check there first!
                        If you want to contribute to the application, check out the code repo.</Text>
                </Stack>
                <Stack className={classes.faqblock}>
                    <Title order={3}>I found a bug or typo!</Title>
                    <Text>Please report bugs and typos (I HATE typos) in the &quot;Report a Bug&quot; channel of our Discord. Since everything is lovingly loaded by hand, there is bound to be typos and spelling mistakes despite our best efforts.</Text>
                    <Text>Bugs and typos are typically fixed within a day, and often within an hour!</Text>
                </Stack>
                <Stack className={classes.faqblock}>
                    <Title order={3}>What is your privacy policy?</Title>
                    <div>Our privacy policy is &quot;We don&lsquo;t want your personal information, and whatever we collect will never be shared with anyone ever no-way no-how&ldquo;.
                        That being said, a few things to note:
                        <ul>
                            <li>We use a cookie to keep you logged in</li>
                            <li>We use your browser&lsquo;s localStorage to hold your settings and preferences</li>
                            <li>We use Google Analytics to track site traffic and performance</li>
                            <li>The web server&lsquo;s logs include your IP address and are purged every 30 days</li>
                            <li>All your rosters are publicly visible. That means that you can easily share your rosters with other people, but it also means you want to be mindful of the content you load, especially the roster and operative portraits.</li>
                        </ul>
                    </div>
                </Stack>
                <Stack className={classes.faqblock}>
                    <Title order={3}>I heard you have some 3d printing STL models available</Title>
                    <Text>You can find all the STL models we designed for terrain and utilities on <Link href="https://www.thingiverse.com/jodawznev/designs" target="_blank">Thingiverse</Link> or <Link href="https://cults3d.com/en/users/jodawznev/3d-models" target="_blank">Cults 3D.</Link></Text>
                </Stack>
                <Stack className={classes.faqblock}>
                    <Title order={3}>Can I donate/give you money? Is there a Patreon, Ko-Fi or other option?</Title>
                    <Text>No thank you. This is a labor of love and I really don&lsquo;t need or want any money.
                        If you really want to give $5 to someone who needs it, look up your local wildlife rescue, women&lsquo;s shelter, or adult literacy program, and tell them I sent you!</Text>
                </Stack>
                <Stack className={classes.faqblock}>
                    <Title order={3}>Is there a way for me to get the data that KTDash uses?</Title>
                    <Text>Right <Link href="https://github.com/vjosset/killteamjson" target="_blank">here</Link> or use the <Link href="https://github.com/vjosset/ktdash/blob/v2/docs/api.md" target="_blank">API.</Link></Text>
                </Stack>
                <Stack className={classes.faqblock}>
                    <Title order={3}>How do i make my own homebrew teams?</Title>
                    <Text>There is no self-service way to load a homebrew team, it&lsquo;s something you&lsquo;d have to send me to get loaded and it takes a long time. There is an item on the <Link href="https://trello.com/b/YWHG6mhJ/backlog" target="_blank">backlog</Link> to add that functionality but it&lsquo;s a ton of work.</Text>
                </Stack>
            </div>
        </Container>
    );
}