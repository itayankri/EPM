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
import SuccessSnackbar from '../common/SuccessSnackbar';

const eventTypes = [
    {
        value: "Village",
        label: "Village"
    },
    {
        value: "Step-Up",
        label: "Step-Up"
    },
    {
        value: "Seminar",
        label: "Seminar"
    }
];

const countriesArr = ['Israel', 'USA', 'France'];
const countries = [
    {
        value: "Israel",
        label: "Israel"
    },
    {
        value: "USA",
        label: "USA"
    },
    {
        value: "France",
        label: "France"
    }
];

const chapters = [
    {
        value: "Tel-Aviv",
        label: "Tel-Aviv"
    },
    {
        value: "Washington-DC",
        label: "Washington-DC"
    },
    {
        value: "Paris",
        label: "Paris"
    }
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
            start: "",
            end: "",
            eventType: 0,
            country: 0,
            chapter: 0,
            eventAddress: "",
            email: "",
            participatingNAs: [],
            eventTheme: "",
            meetingPointName: "",
            meetingPointAddress: "",
            meetingDate: "",
            nearestAirportName: "",
            nearestAirportCode: "",
            nearestTrainStation: "",
            arriveBefore: "",
            leaveAfter: "",
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: "",
            isSuccessSnackbarOpen: false,
            successSnackbarMessage: ""
        }
    }

    handleChipsChange = event => {
        this.setState({participatingNAs: event.target.value});
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    onSubmit = event => {
        submitEvent(this.state)
            .then(result => {
                this.setState({
                    isSuccessSnackbarOpen: true,
                    successSnackbarMessage: "Event created Successfully"
                });
                this.props.history.push("/events/");
            })
            .catch(err => {
                this.setState({
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to create event - ${err}`
                });
            });
    };

    handleErrorSnackbarClose = event => {
        this.setState({isErrorSnackbarOpen: false})
    };

    handleSuccessSnackbarClose = event => {
        this.setState({isSuccessSnackbarOpen: false})
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
                            name="start"
                            label="Start Date"
                            value={this.state.startDate}
                            onChange={this.handleChange}
                        />
                        <DateInput
                            name="end"
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
                            name="country"
                            label="Host Country"
                            options={countries}
                            value={this.state.country}
                            onChange={this.handleChange}
                        />
                        <DropDownInput
                            name="chapter"
                            label="Host Chapter"
                            options={chapters}
                            value={this.state.chapter}
                            onChange={this.handleChange}
                        />
                        <TextInput
                            name="eventAddress"
                            label="Event Address"
                            placeholder="Enter an Event address"
                            value={this.state.eventAddress}
                            onChange={this.handleChange}
                        />
                        <TextInput
                            name="email"
                            label="Event Email"
                            placeholder="Enter an Event Email address"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <ChipsDropDownInput
                            name="participatingNAs"
                            label="Participating NAs"
                            value={this.state.participatingNAs}
                            handleChange={this.handleChipsChange}
                            items={countriesArr}
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
                        <TextInput
                            name="nearestTrainStation"
                            label="Nearest Train Station"
                            placeholder="A train station name"
                            value={this.state.nearestTrainStation}
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
                    errorMessage={this.state.errorSnackbarMessage}
                />
                <SuccessSnackbar
                    open={this.state.isSuccessSnackbarOpen}
                    handleClose={this.handleSuccessSnackbarClose}
                    message={this.state.successSnackbarMessage}
                />
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(CreateEvent);
