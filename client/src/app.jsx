import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Feature_Menu from '../components/Feature_Menu';
import AVEM_About from '../components/AV_Event_Mixer/AVEM_About';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Feature_Menu}></Route>
                    <Route path="/avem" component={AVEM_About}></Route>
                </Switch>
            </div>
        </Router>
    )
}

render(
    <App />,
    document.getElementById("root")
)
