import React from 'react';
import { Router, Switch, Route } from './Router/index.web';
import * as urls from "./UrlStore.json";
import Main from '../Components/Main';

class Routes extends React.PureComponent {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={urls.Root} component={Main}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes;
