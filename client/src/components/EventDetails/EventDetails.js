/**
 * Created by ItayAnkri on 12/23/2018.
 */

import React from 'react';
import {withStyles} from 'react-with-styles';
import classNames from 'classnames';
import {
    Typography,
} from '@material-ui/core';

const styles = theme => ({

});

class EventDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <Typography>Event Id: {this.props.match.params.eventId}</Typography>
            </div>
        );
    }
}

export default withStyles(styles)(EventDetails);