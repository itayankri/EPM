/**
 * Created by ItayAnkri on 12/23/2018.
 */

import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography,
} from '@material-ui/core';
import Spinner from "../common/Spinner";
import CustomizedTabs from '../common/CustomizedTabs';
import EventSummaryTabView from './EventSummaryTabView';
import EventParticipationsTabView from './EventParticipationsTabView';
import EventOtherTabView from './EventOtherTabView';
import {getEvent} from "../../actions/eventsActions";
import ErrorSnackbar from "../common/ErrorSnackbar";

const styles = theme => ({});

class EventDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            selectedTab: 0,
            eventId: this.props.match.params.eventId,
            event: null,
            isSuccessSnackbarOpen: false,
            successSnackbarOpen: "",
            isErrorSnackbarOpen: false,
            errorSnackbarMessage: "",
        };
    }

    componentWillMount() {
        getEvent(this.state.eventId)
            .then(res => {
                this.setState({
                    isLoading: false,
                    event: res.data
                })
            })
            .catch(err => {
                this.setState({
                    isErrorSnackbarOpen: true,
                    errorSnackbarMessage: `Failed to load Event - ${err}`,
                })
            });
    }

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

        let tabToRender;

        if (this.state.selectedTab === 0) {
            tabToRender = <EventSummaryTabView event={this.state.event}/>
        } else if (this.state.selectedTab === 1) {
            tabToRender = <EventParticipationsTabView event={this.state.event}
                                                      onParticipationRoleChange={this.onParticipationRoleChange}/>
        } else {
            tabToRender = <EventOtherTabView event={this.state.event}/>
        }

        return (
            <div>
                <CustomizedTabs
                    value={this.state.selectedTab}
                    handleChange={this.handleChange}
                    tabs={['Summary', 'Participation', 'Other']}
                />
                {tabToRender}
                <ErrorSnackbar
                    open={this.state.isErrorSnackbarOpen}
                    handleClose={this.handleErrorSnackbarClose}
                    errorMessage={this.state.errorSnackbarMessage}
                />
            </div>
        );
    }
}

export default withStyles(styles)(EventDetails);