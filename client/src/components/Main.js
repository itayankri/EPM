/**
 * Created by ItayAnkri on 12/19/2018.
 */
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Login from './Login/Login';
import About from './About/About';
import Register from './Register/Register';
import 'react-dates/initialize';

const styles = theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class Main extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={About}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Main);