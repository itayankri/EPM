import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography,
} from '@material-ui/core';

const styles = ({});

class EventSummaryTabView extends React.Component {
    render() {
        return (
            <Typography>Event Summary</Typography>
        );
    }
}

export default withStyles(styles)(EventSummaryTabView);