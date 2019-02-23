import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography,
} from '@material-ui/core';
import Spinner from '../common/Spinner';

const styles = ({});

class EventSummaryTabView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <br/>
                <Typography>Summary</Typography>
                <br/>
                <Typography>{JSON.stringify(this.props.event)}</Typography>
            </div>
        );
    }
}

export default withStyles(styles)(EventSummaryTabView);