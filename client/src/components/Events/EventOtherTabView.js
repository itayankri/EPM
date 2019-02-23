import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography,
} from '@material-ui/core';
import Spinner from "./EventSummaryTabView";

const styles = ({

});

class EventOtherTabView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <Typography>Other</Typography>
        );
    }
}

export default withStyles(styles)(EventOtherTabView);