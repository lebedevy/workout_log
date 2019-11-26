import React, { Component } from 'react';
import './App.css';

import Session from './components/Session';
import CreateRoutine from './components/CreateRoutine';
import LandingPage from './components/LandingPage';

import { withStyles } from '@material-ui/styles';

const AppStyle = theme => ({
    container: {},
});

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    {/* <CreateRoutine /> */}
                    <LandingPage />
                </div>
            </div>
        );
    }
}

export default withStyles(AppStyle)(App);
