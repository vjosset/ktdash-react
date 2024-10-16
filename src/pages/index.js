import { Route, Switch } from "wouter";
import Home from "./home";
import Factions from "./factions";
import Faction from "./faction";
import Team from "./team";
import Login from "./login";
import Register from "./register";

export default function Root() {

    return (
        <Switch>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/allfactions" component={Factions} />
            <Route path="/fa/:factionId" component={Faction} />
            <Route path="/fa/:factionId/kt/:killteamId" component={Team} />
            <Route>404: No such page!</Route>
        </Switch>
    );
}
