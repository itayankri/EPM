import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/es/Typography/Typography";
import Spinner from "./EventSummaryTabView";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = theme => ({});

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.userDetails.isUserLoggedIn,
        user: state.userDetails.user,
    }
};

class ParticipantEventView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ""
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props !== prevProps) {
            if (this.props.event && this.props.user) {
                for (let participation of this.props.event.participations) {
                    if (participation.User.id === this.props.user.id) {
                        this.setState({status: participation.status});
                    }
                }
            }
        }
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
                <Typography
                    variant="h4"
                    component="h2"
                >
                    Event Details
                    <Button
                        variant="outlined"
                        disabled
                        style={{
                            marginLeft: 10,
                            color: 'red'
                        }}
                    >
                        Participation Status: {this.state.status}
                    </Button>
                </Typography>
                {/*<Typography variant="subheading">Participation Status: UNCLAIMED</Typography>*/}
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
                        <Typography><b>E-mail:</b> {event.email}</Typography>
                        <br/>
                        <Typography><b>Theme:</b> {event.theme}</Typography>
                        <br/>
                    </Grid>
                    <Button
                        color="primary"
                        variant="contained"
                        style={{
                            position: 'absolute',
                            top: 100,
                            right: 30
                        }}
                    >
                        Claim Participation
                    </Button>
                </Grid>
                <br/>
                <Typography>Some descriptions text that describes the descriptions of the event that described in this
                    description.</Typography>
            </div>
        );
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ParticipantEventView));