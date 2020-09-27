import React from 'react'
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Feature_Menu from '../components/Feature_Menu';
import AVEM from '../components/AV_Event_Mixer/AVEM';
import AVEM_Event_Selection from '../components/AV_Event_Mixer/AVEM_Event_Selection';

const App = () => {
    return (
        <>
            <header>
                VENI <span>Studio</span>
            </header>
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={Feature_Menu}></Route>
                        <Route path="/avem" exact component={AVEM}></Route>
                        <Route path="/avem_event_selection" exact component={AVEM_Event_Selection}></Route>
                    </Switch>
                </div>
            </Router>
        </>
    )
}

render(
    <App />,
    document.getElementById("root")
)
