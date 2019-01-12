/**
 * Created by ItayAnkri on 12/22/2018.
 */

import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {
    Typography,
    Grid,
    Button
} from '@material-ui/core';
import DateInput from '../common/InputFields/DateInput';
import DropDownInput from '../common/InputFields/DropDownInput';
import ChipsDropDownInput from '../common/InputFields/ChipsDropDownInput';
import TextInput from '../common/InputFields/TextInput';
import {submitEvent} from "../../actions/eventsActions";
import ErrorSnackbar from '../common/ErrorSnackbar';

const eventTypes = [
    {
        value: 1,
        label: "Event Type 1"
    },
    {
        value: 2,
        label: "Event Type 2"
    },
    {
        value: 3,
        label: "Event Type 3"
    }
];

const countries = [
    'Israel',
    'spain',
    'USA',
    'Iran',
    'France'
];

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    actions: {
        margin: 5
    },
    link: {
        textDecoration: 'none'
    },
});

class CreateEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: "",
            endDate: "",
            eventType: 0,
            hostCountry: 0,
            hostChapter: 0,
            eventAddress: "",
            participatingNAs: [],
            eventTheme: "",
            meetingPointName: "",
            meetingPointAddress: "",
            meetingDate: "",
            nearestAirportName: "",
            nearestAirportCode: "",
            arriveBefore: "",
            leaveAfter: "",
            isErrorSnackbarOpen: false
        }
    }

    handleChipsChange = event => {
        this.setState({participatingNAs: event.target.value});
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    onSubmit = event => {
        submitEvent(this.state).then(result => {
            if (result) {
                this.props.history.push('/events');
            } else {
                this.setState({isErrorSnackbarOpen: true});
            }
        });
    };

    handleErrorSnackbarClose = event => {
        this.setState({isErrorSnackbarOpen: false})
    };

    render() {
        let {classes} = this.props;
        return (
            <div>
                <Grid container>
                    <Grid item md={9}>
                        <Typography variant="h4" component="h2">
                            Create Event
                        </Typography>
                        <br/>
                        <DateInput
                            name="startDate"
                            label="Start Date"
                            value={this.state.startDate}
                            onChange={this.handleChange}
                        />
                        <DateInput
                            name="endDate"
                            label="End Date"
                            value={this.state.endDate}
                            onChange={this.handleChange}
                        />
                        <DropDownInput
                            name="eventType"
                            label="Event Type"
                            options={eventTypes}
                            value={this.state.eventType}
                            onChange={this.handleChange}
                        />
                        <DropDownInput
                            name="hostCountry"
                            label="Host Country"
                            options={eventTypes}
                            value={this.state.hostCountry}
                            onChange={this.handleChange}
                        />
                        <DropDownInput
                            name="hostChapter"
                            label="Host Chapter"
                            options={eventTypes}
                            value={this.state.hostChapter}
                            onChange={this.handleChange}
                        />
                        <TextInput
                            name="eventAddress"
                            label="Event Address"
                            placeholder="Enter an Event address"
                            value={this.state.eventAddress}
                            onChange={this.handleChange}
                        />
                        <ChipsDropDownInput
                            name="participatingNAs"
                            label="Participating NAs"
                            value={this.state.participatingNAs}
                            handleChange={this.handleChipsChange}
                            items={countries}
                        />
                        <TextInput
                            name="eventTheme"
                            label="Event Theme"
                            placeholder="Enter an event theme"
                            value={this.state.eventTheme}
                            onChange={this.handleChange}
                        />
                        <TextInput
                            name="meetingPointName"
                            label="Meeting Point Name"
                            placeholder="Enter a meeting point name"
                            value={this.state.meetingPointName}
                            onChange={this.handleChange}
                        />
                        <TextInput
                            name="meetingPointAddress"
                            label="Meeting Point Address"
                            placeholder="Enter a meeting point address"
                            value={this.state.meetingPointAddress}
                            onChange={this.handleChange}
                        />
                        <DateInput
                            name="meetingDate"
                            label="Meeting Date"
                            value={this.state.meetingDate}
                            onChange={this.handleChange}
                        />
                        <TextInput
                            name="nearestAirportName"
                            label="Nearest Airport Name"
                            placeholder="Enter the name of the nearest airport to the event location"
                            value={this.state.nearestAirportName}
                            onChange={this.handleChange}
                        />
                        <TextInput
                            name="nearestAirportCode"
                            label="Nearest Airport Code"
                            placeholder="A three characters code"
                            value={this.state.nearestAirportCode}
                            onChange={this.handleChange}
                        />
                        <DateInput
                            name="arriveBefore"
                            label="Arrive Before"
                            time
                            value={this.state.arriveBefore}
                            onChange={this.handleChange}
                        />
                        <DateInput
                            name="leaveAfter"
                            label="Leave After"
                            time
                            value={this.state.leaveAfter}
                            onChange={this.handleChange}
                        />
                        <br/>
                    </Grid>
                    <Grid container>
                        <Grid item md={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.actions}
                                onClick={this.onSubmit}
                            >
                                Submit
                            </Button>
                            <Link to="/events" className={classes.link}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.actions}
                                >
                                    Cancel
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <ErrorSnackbar
                    open={this.state.isErrorSnackbarOpen}
                    handleClose={this.handleErrorSnackbarClose}
                    errorMessage="An error occurred while saving the event."
                />
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(CreateEvent);
