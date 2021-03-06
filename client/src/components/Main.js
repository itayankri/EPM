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
import CampShop from './CampShop/CampShop';
import CreateItem from './CampShop/CreateItem';
import Blog from './Blog/Blog';
import RoomRandomizer from './RoomRandomizer/RoomRandomizer';
import CampSchedule from './CampSchedule/CampSchedule';
import Pdpef from './Pdpef/Pdpef';
import Account from './Account/Account';
import LeadersNotes from './LeaderNotes/LeadersNotes';
import SecureRoute from './common/SecureRoute';
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
                    <Route exact path="/account" component={Account}/>
                    <Route exact path="/events" component={Events}/>
                    <Route exact path="/events/create" component={CreateEvent}/>
                    <Route exact path="/events/:eventId" component={EventDetails}/>
                    <Route exact path="/events/:eventId/generateForms" component={GenerateForms}/>
                    <Route exact path="/events/:eventId/campShop" component={CampShop}/>
                    <Route exact path="/events/:eventId/campShop/createItem" component={CreateItem}/>
                    <Route exact path="/events/:eventId/contactList" component={ContactList}/>
                    <Route exact path="/events/:eventId/roomRandomizer" component={RoomRandomizer}/>
                    <Route exact path="/events/:eventId/blog" component={Blog}/>
                    <Route exact path="/events/:eventId/campSchedule" component={CampSchedule}/>
                    <Route exact path="/events/:eventId/pdpef" component={Pdpef}/>
                    <Route exact path="/events/:eventId/leadersNotes" component={LeadersNotes}/>
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Main);