import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/es/Typography/Typography";
import Spinner from "./EventSummaryTabView";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {claimParticipation, cancelParticipation} from "../../actions/eventsActions";

const styles = theme => ({});

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.userDetails.isUserLoggedIn,
        user: state.userDetails.user,
    }
};

const getStatusColor = (status) => {
    if (status === 'APPROVED') {
        return 'green';
    } else if (status === 'DECLINED') {
        return 'red';
    } else if (status === 'CLAIMED' || status === 'PENDING') {
        return 'orange';
    } else {
        return 'gray'
    }
};

class ParticipantEventView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "UNCLAIMED"
        };

        if (props.event && props.user) {
            for (let participation of props.event.participations) {
                if (participation.User.id === props.user.id) {
                    this.state.status = participation.status
                }
            }
        }

        this.onClaimParticipationButtonClick = this.onClaimParticipationButtonClick.bind(this);
        this.onCancelParticipationButtonClick = this.onCancelParticipationButtonClick.bind(this);
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

    onClaimParticipationButtonClick() {
        claimParticipation(this.props.user.id, this.props.event.id)
            .then(() => {
                this.setState({status: 'CLAIMED'})
            })
    }

    onCancelParticipationButtonClick() {
        cancelParticipation(this.props.user.id, this.props.event.id)
            .then(() => {
                this.setState({status: 'UNCLAIMED'})
            })
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
                <Button
                    variant="outlined"
                    disabled
                    style={{
                        position: 'absolute',
                        top: 150,
                        right: 250,
                        color: getStatusColor(this.state.status)
                    }}
                >
                    Participation Status: {this.state.status}
                </Button>
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
                        // disabled={this.state.status !== 'UNCLAIMED'}
                        onClick={this.state.status !== 'UNCLAIMED' ? this.onCancelParticipationButtonClick : this.onClaimParticipationButtonClick}
                        color="primary"
                        variant="contained"
                        style={{
                            position: 'absolute',
                            top: 150,
                            right: 30
                        }}
                    >
                        {this.state.status === 'UNCLAIMED' ? 'Claim Participation' : 'Cancel Participation'}
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