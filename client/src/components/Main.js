/**
 * Created by ItayAnkri on 12/19/2018.
 */
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Login from './Login/Login';
import About from './About/About';
import Register from './Register/Register';
import Events from './Events/Events';
import EventDetails from './Events/EventDetails';
import CreateEvent from './Events/CreateEvent';
import GenerateForms from './GenerateForms/GenerateForms';
import ContactList from './ContactList/ContactList';
import Blog from './Blog/Blog';
import RoomRandomizer from './RoomRandomizer/RoomRandomizer'
import Pdpef from './Pdpef/Pdpef'
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
                <Switch>
                    <Route exact path="/" component={About}/>
                    <Route exact path="/home" component={About}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/events" component={Events}/>
                    <Route exact path="/events/create" component={CreateEvent}/>
                    <Route exact path="/events/:eventId" component={EventDetails}/>
                    <Route exact path="/events/:eventId/generateForms" component={GenerateForms}/>
                    <Route exact path="/events/:eventId/contactList" component={ContactList}/>
                    <Route exact path="/events/:eventId/blog" component={Blog}/>
                    <Route exact path="/events/:eventId/roomRandomizer" component={RoomRandomizer}/>
                    <Route exact path="/events/:eventId/pdpef" component={Pdpef}/>
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Main);