import { Route, Switch } from "wouter";
import Home from "./home";
import Factions from "./factions";
import Faction from "./faction";
import Team from "./team";
import Login from "./login";
import Register from "./register";
import Rosters from "./rosters";
import Roster from "./roster";
import Settings from "./settings";

export default function Root() {

    return (
        <Switch>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/settings" component={Settings} />
            <Route path="/u/:userId" component={Rosters} />
            <Route path="/r/:rosterId" component={Roster} />
            <Route path="/allfactions" component={Factions} />
            <Route path="/fa/:factionId" component={Faction} />
            <Route path="/fa/:factionId/kt/:killteamId" component={Team} />
            <Route>404: No such page!</Route>
        </Switch>
    );
}
