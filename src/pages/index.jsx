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
import Dashboard from "./dashboard";
import Gallery from "./gallery";

export default function Root() {
    return (
        <Switch>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/settings" component={Settings} />
            <Route path="/u/:userId" component={Rosters} />
            <Route path="/r/:rosterId" component={Roster} />
            <Route path="/r/:rosterId/g" component={Gallery} />
            <Route path="/allfactions" component={Factions} />
            <Route path="/fa/:factionId" component={Faction} />
            <Route path="/fa/:factionId/kt/:killteamId" component={Team} />
            <Route>404: No such page!</Route>
        </Switch>
    );
}
