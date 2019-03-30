import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography,
} from '@material-ui/core';
import Spinner from '../common/Spinner';
import Grid from "@material-ui/core/Grid";

const styles = ({});

class EventSummaryTabView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {event} = this.props;

        if (!event) {
            return (
                <Spinner/>
            )
        }

        return (
            <div>
                <Grid container spacing={16}>
                    <Grid item md={4}>
                        <br/>
                        <Typography><b>Event code:</b> {event.code}</Typography>
                        <br/>
                        <Typography><b>Event Type:</b> {event.end}</Typography>
                        <br/>
                        <Typography><b>Start date:</b> {event.start}</Typography>
                        <br/>
                        <Typography><b>End date:</b> {event.end}</Typography>
                        <br/>
                        <Typography><b>Country:</b> {event.country}</Typography>
                        <br/>
                        <Typography><b>Chapter:</b> {event.chapter}</Typography>
                        <br/>
                        <Typography><b>Address:</b> {event.address}</Typography>
                        <br/>
                        <Typography><b>E-mail:</b> {event.email}</Typography>
                        <br/>
                        <Typography><b>Theme:</b> {event.theme}</Typography>
                        <br/>
                    </Grid>
                    <Grid item md={4}>
                        <br/>
                        <Typography><b>Meeting Point Name:</b> {event.meetingPointName}</Typography>
                        <br/>
                        <Typography><b>Meeting Point Address:</b> {event.meetingPointAddress}</Typography>
                        <br/>
                        <Typography><b>Meeting date:</b> {event.meetingDate}</Typography>
                        <br/>
                        <Typography><b>Nearest
                            Airport:</b> {event.nearestAirportName} ({event.nearestAirportCode})</Typography>
                        <br/>
                        <Typography><b>Nearest Train Station:</b> {event.nearestTrainStation}</Typography>
                        <br/>
                        <Typography><b>Arrive before:</b> {event.arriveBefore}</Typography>
                        <br/>
                        <Typography><b>Leave after:</b> {event.leaveAfter}</Typography>
                        <br/>
                    </Grid>
                </Grid>
                <br/>
                <Typography>Some descriptions text that describes the descriptions of the event that described in this description.</Typography>
            </div>
        );
    }
}

export default withStyles(styles)(EventSummaryTabView);