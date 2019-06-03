/**
 * Created by ItayAnkri on 12/23/2018.
 */

import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Spinner from "../common/Spinner";
import CustomizedTabs from '../common/CustomizedTabs';
import EventSummaryTabView from './EventSummaryTabView';
import EventParticipationTableView from './EventParticipationTableView';
import ParticipantEventView from './ParticipantEventView';
import EventOtherTabView from './EventOtherTabView';
import {getEvent, getEventRoles} from "../../actions/eventsActions";
import ErrorSnackbar from "../common/ErrorSnackbar";

const styles = theme => ({});

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.userDetails.isUserLoggedIn,
        user: state.userDetails.user,
    }
};

class EventDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            selectedTab: 0,
            eventId: this.props.match.params.eventId,
            event: null,
            eventRoles: [],
            isSuccessSnackbarOpen: false,
            successSnackbarOpen: "",
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: "",
        };
    }

    componentWillMount() {
        this.refreshEvent()
    }

    refreshEvent = () => {
        Promise.all([getEventRoles(), getEvent(this.state.eventId)])
            .then(res => {
                this.setState({
                    isLoading: false,
                    event: res[1].data,
                    eventRoles: res[0].data
                })
            })
            .catch(err => {
                this.setState({
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to load Event - ${err}`,
                })
            });
    };

    handleErrorSnackbarClose = event => {
        this.setState({isErrorSnackbarOpen: false})
    };

    handleChange = (event, value) => {
        this.setState({selectedTab: value});
    };

    onParticipationRoleChange = (participationIndex, roleId) => {
        let event = this.state.event;
        event.participations[participationIndex].roleId = roleId;
        this.setState({event: event});
    };

    render() {
        if (this.state.isLoading) {
            return (
                <Spinner/>
            );
        }

        let isAdmin = (this.props.user && this.props.user.isAdmin);
        let tabToRender;

        if (this.state.selectedTab === 0) {
            tabToRender = <EventSummaryTabView event={this.state.event}/>
        } else if (this.state.selectedTab === 1) {
            tabToRender = <EventParticipationTableView
                event={this.state.event}
                eventRoles={this.state.eventRoles}
                onParticipationRoleChange={this.onParticipationRoleChange}
                refreshEvent={this.refreshEvent}/>
        } else {
            tabToRender = <EventOtherTabView event={this.state.event}/>
        }

        return (
            <div>
                {
                    isAdmin &&
                    <CustomizedTabs
                        value={this.state.selectedTab}
                        handleChange={this.handleChange}
                        tabs={['Summary', 'Participation', 'Other']}
                    />
                }
                {
                    isAdmin ?
                        tabToRender
                        :
                        <ParticipantEventView
                            event={this.state.event}
                        />
                }
                <ErrorSnackbar
                    open={this.state.isErrorSnackbarOpen}
                    handleClose={this.handleErrorSnackbarClose}
                    errorMessage={this.state.errorSnackbarMessage}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EventDetails));