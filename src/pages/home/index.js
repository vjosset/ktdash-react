import { Title, Text, Container } from "@mantine/core";
import classes from './home.module.css';

export default function Home() {

    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.inner}>
                    <Title className={classes.title}>
                        KTDash
                    </Title>

                    <Container className={classes.description} size={640}>
                        <Text>KTDash is a web-based application for running your KillTeam games.</Text>
                        <ul>
                            <li>Browse the Factions</li>
                            <li>Build your rosters or import a pre-built roster</li>
                            <li>Generate names for your operatives</li>
                            <li>Use the Dashboard to play your games and track operative wounds, TacOps, Ploys, operative orders and activation, TP/CP/VP, and more</li>
                        </ul>
                    </Container>
                </div>
            </div>
        </>
    );
}
